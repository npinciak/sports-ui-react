import { EVENT_STATUS_TYPE } from 'sports-ui-sdk';
import { NO_LOGO } from '../../constants';
import { includeSports, parseEventUidStringToId, parseTeamUidStringToId, teamColorHandler } from '../../espn-helpers';
import { FASTCAST_EVENT_TYPE, ICompetitorsEntity, IEventsEntity, ILeaguesEntity, ISportsEntity } from '../models';
import { IFastcastCheckpoint } from '../models/fastcast-checkpoint.model';
import { FastcastEvent, FootballSituation, MlbSituation } from '../models/fastcast-event.model';
import { FastcastLeague } from '../models/fastcast-league.model';
import { IFastcastSportEntity } from '../models/fastcast-sport.model';
import { FastcastEventTeam } from '../models/fastcast-team.model';

export function flatten<T extends Object>(arr: T[][]): T[] {
  if (arr == undefined) return [];
  return ([] as T[]).concat(...arr);
}

function exists(value: any): boolean {
  return value != undefined || value != null;
}

export function clientFastcastToFastcast(response: IFastcastCheckpoint) {
  const { sports } = response;

  const fastcastSports: IFastcastSportEntity[] = [];
  const leagueList: ILeaguesEntity[] = [];

  sports.forEach(sport => {
    const { id } = sport;
    if (includeSports(id)) {
      fastcastSports.push(clientSportsEntityToSport(sport));
      leagueList.push(...sport.leagues);
    }
  });

  const fastcastLeagues: FastcastLeague[] = [];
  const fastcastEvents: FastcastEvent[] = [];

  leagueList.forEach(league => {
    fastcastLeagues.push(clientLeagueImportToFastcastLeague(league));
    if (league.events != undefined && league.events != null) {
      league.events.forEach(event => {
        fastcastEvents.push(clientEventToFastcastEvent(event));
      });
    }
  });

  return {
    fastcastSports,
    fastcastLeagues,
    fastcastEvents,
  };
}

export function clientSportsEntityToSport(sportsEntity: ISportsEntity): Pick<ISportsEntity, 'id' | 'uid' | 'name' | 'slug'> {
  const { id, uid, name, slug } = sportsEntity;
  return {
    id,
    uid,
    name,
    slug,
  };
}

export function clientLeagueImportToFastcastLeague(leagueImport: ILeaguesEntity): FastcastLeague {
  const { id, uid, name, slug, isTournament, abbreviation, shortName } = leagueImport;
  return {
    id,
    uid,
    name,
    slug,
    isTournament,
    abbreviation: abbreviation ?? name,
    shortName: shortName ?? name,
    sport: '',
  };
}

export function clientCompetitorToFastcastTeam(eventUid: string, data: ICompetitorsEntity): FastcastEventTeam | null {
  if (!data) return null;

  const { id, uid, name, winner, score, logo, abbreviation, homeAway, alternateColor, rank, seriesRecord } = data;

  const record = data.record == undefined ? null : typeof data.record === 'string' ? data.record : data.record[0].displayValue;

  return {
    id,
    uid,
    eventIds: parseTeamUidStringToId(uid),
    score,
    abbrev: abbreviation,
    isHome: homeAway,
    logo: logo.length > 0 ? logo : NO_LOGO,
    isWinner: winner,
    name: name ?? abbreviation,
    color: teamColorHandler(data),
    altColor: alternateColor ? `#${alternateColor}` : null,
    record,
    rank: rank ?? null,
    winPct: null,
    seriesRecord,
  };
}

export function clientEventToFastcastEvent(event: IEventsEntity): FastcastEvent {
  // if (!event) return null;

  const mlbSituation = {} as MlbSituation;

  // mlbSituation.batter = event?.situation?.batter;
  // mlbSituation.pitcher = event?.situation?.pitcher;
  // mlbSituation.balls = event?.situation?.balls;
  // mlbSituation.strikes = event?.situation?.strikes;
  // mlbSituation.outs = event?.situation?.outs;
  // mlbSituation.onFirst = event?.situation?.onFirst;
  // mlbSituation.onSecond = event?.situation?.onSecond;
  // mlbSituation.onThird = event?.situation?.onThird;

  const footballSituation = {} as FootballSituation;

  footballSituation['shortDownDistanceText'] = event?.situation?.shortDownDistanceText ?? '';
  footballSituation['possessionText'] = event?.situation?.possessionText ?? '';
  footballSituation['isRedZone'] = false;
  footballSituation['possession'] = event?.situation?.possession ?? '';

  const teams = exists(event.competitors)
    ? event.competitors.reduce(
        (obj, val) => {
          const { homeAway } = val;
          obj[homeAway] = clientCompetitorToFastcastTeam(event.uid, val);
          return obj;
        },
        {} as Record<string, FastcastEventTeam | null>
      )
    : null;

  const {
    id,
    uid,
    name,
    status,
    seasonType,
    shortName,
    location,
    summary,
    period,
    link,
    date,
    fullStatus: {
      type: { state, completed },
    },
    odds,
    note,
    clock,
    seriesSummary,
    situation,
  } = event;

  return {
    id,
    uid,
    eventIds: parseEventUidStringToId(uid),
    timestamp: new Date(date).getTime(),
    state,
    completed,
    status,
    statusId: event.fullStatus.type.id,
    name,
    seasonType,
    shortName,
    location,
    clock: clock ?? null,
    seriesSummary: seriesSummary ?? null,
    summary,
    period,
    isTournament: false,
    note: note ?? null,
    isHalftime: event?.fullStatus.type?.id ? event?.fullStatus.type.id === EVENT_STATUS_TYPE.Halftime : false,
    lastPlay: situation?.lastPlay ?? null,
    link,
    odds: odds ?? null,
    mlbSituation,
    footballSituation,
    teams,
  };
}

/**
 *
 * Transform fastcast event slug to live game
 * @param payload  ```typescript
 *
 * {
 *    sport: string;
 *    league: string;
 *    gameId: string
 * }
 *
 * ```
 * @returns ```typescript
 * Ex: gp-baseball-mlb-401355468
 * ```
 *
 */
export function transformEventToLiveFastcastEventType({ sport, league, gameId }: { sport: string; league: string; gameId: string }) {
  return `${FASTCAST_EVENT_TYPE.LiveGame}-${sport}-${league}-${gameId}`;
}

/**
 *
 * Transform fastcast sport
 * @param payload  ```typescript
 *
 * {
 *    sport: string;
 *    league: string;
 * }
 *
 * ```
 * @returns ```typescript
 * Ex: event-baseball-mlb
 * ```
 *
 */
export function transformSportToFastcastEventType({ sport }: { sport: string }): string;
export function transformSportToFastcastEventType({ sport, league }: { sport: string; league: string }): string;
export function transformSportToFastcastEventType({ sport, league }: { sport: string; league?: string }): string {
  if (!exists(league)) {
    `${FASTCAST_EVENT_TYPE.Event}-${sport}`;
  }
  return `${FASTCAST_EVENT_TYPE.Event}-${sport}-${league}`;
}

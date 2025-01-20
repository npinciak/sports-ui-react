import { EVENT_STATUS, EVENT_STATUS_TYPE, SEASON_TYPE, SEASON_TYPE_LIST } from 'sports-ui-sdk';
import { NO_LOGO } from '../../constants';
import { parseEventUidStringToId, parseTeamUidStringToId, teamColorHandler } from '../../espn-helpers';
import { SPORT_TYPE_ID_INCLUDE_LIST } from '../../models/sport-type.model';
import { EspnDateHelper } from '../helpers/espn-date-helper';
import { FASTCAST_EVENT_TYPE, ICompetitorsEntity, IEventsEntity, ILeaguesEntity, ISportsEntity } from '../models';
import { IFastcastCheckpoint } from '../models/fastcast-checkpoint.model';
import { EventSummaryBySeasonTypeByEventStatus } from '../models/fastcast-event-summary.model';
import { BaseballSituation, FastcastEvent, FootballSituation } from '../models/fastcast-event.model';
import { UIFastcastLeague } from '../models/fastcast-league.model';
import { IFastcastSportEntity } from '../models/fastcast-sport.model';
import { FastcastEventTeam } from '../models/fastcast-team.model';

function exists(value: any): boolean {
  return value != undefined || value != null;
}

export function transformFastcastCheckpointToUIFastcast(response: IFastcastCheckpoint) {
  const { sports } = response;

  const fastcastSports: IFastcastSportEntity[] = [];
  const leagueList: ILeaguesEntity[] = [];

  sports.forEach(sport => {
    const { id } = sport;

    const hasSportId = (SPORT_TYPE_ID_INCLUDE_LIST as string[]).includes(id);

    if (hasSportId) {
      fastcastSports.push(transformISportsEntityToSport(sport));
      leagueList.push(...sport.leagues);
    }
  });

  const fastcastLeagues: UIFastcastLeague[] = [];
  const fastcastEvents: FastcastEvent[] = [];

  leagueList.forEach(league => {
    if (
      league.events != undefined &&
      league.events != null &&
      !['14', '62', '91', '760', '102', '3923', '8097', '8301', '20226', '54', '59', '19834', '8301', '19483', '19868', '19728'].includes(
        league.id
      )
    ) {
      fastcastLeagues.push(transformILeaguesImportToUIFastcastLeague(league));

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

export function transformISportsEntityToSport(sportsEntity: ISportsEntity): Pick<ISportsEntity, 'id' | 'uid' | 'name' | 'slug'> {
  const { id, uid, name, slug } = sportsEntity;
  return {
    id,
    uid,
    name,
    slug,
  };
}

export function transformILeaguesImportToUIFastcastLeague(leagueImport: ILeaguesEntity): UIFastcastLeague {
  const { id, uid, name, slug, isTournament, abbreviation, shortName } = leagueImport;
  return {
    id,
    uid,
    name,
    slug,
    isTournament,
    abbreviation: abbreviation ?? name,
    shortName: shortName ?? name,
  };
}

export function clientCompetitorToFastcastTeam(data: ICompetitorsEntity, event: IEventsEntity): FastcastEventTeam {
  const { id, uid, name, winner, score, logo, logoDark, abbreviation, homeAway, alternateColor, rank, seriesRecord, scoringSummary } = data;

  const record = typeof data.record === 'string' ? data.record : (data.record?.[0]?.displayValue ?? null);

  const isHome = homeAway === 'home';

  const situation = event.situation ?? null;
  const lastPlay = situation?.lastPlay ?? null;
  const probability = lastPlay?.probability ?? null;
  const homeWinPercentage = probability?.homeWinPercentage ?? 0;
  const awayWinPercentage = probability?.awayWinPercentage ?? 0;

  const chanceToWinPct = isHome ? homeWinPercentage * 100 : awayWinPercentage * 100;

  return {
    id,
    uid,
    eventIds: parseTeamUidStringToId(uid),
    score,
    abbrev: abbreviation,
    isHome,
    logo: logo && logo.length > 0 ? logo : NO_LOGO,
    logoDark: logoDark ?? NO_LOGO,
    isWinner: winner,
    name: name ?? abbreviation,
    color: teamColorHandler(data),
    altColor: alternateColor ? `#${alternateColor}` : null,
    record,
    rank: rank ?? null,
    chanceToWinPct,
    seriesRecord: seriesRecord ?? null,
    scoringSummary: scoringSummary ?? null,
  };
}

export function addFootballSituationToFastcastEvent(event: IEventsEntity): FootballSituation | null {
  const { situation } = event;
  if (!situation) return null;

  return {
    shortDownDistanceText: situation.shortDownDistanceText ?? null,
    possessionText: situation.possessionText ?? null,
    isRedZone: situation.isRedZone ?? false,
    possession: situation.possession ?? null,
  };
}

export function addBaseballSituationToFastcastEvent(event: IEventsEntity): BaseballSituation | null {
  const { situation } = event;
  if (!situation) return null;

  return {
    batter: situation.batter ?? null,
    pitcher: situation.pitcher ?? null,
    balls: situation.balls ?? null,
    strikes: situation.strikes ?? null,
    outs: situation.outs ?? null,
    onFirst: situation.onFirst ?? null,
    onSecond: situation.onSecond ?? null,
    onThird: situation.onThird ?? null,
  };
}

export function addCompetitorsToFastcastEvent(event: IEventsEntity): Record<string, FastcastEventTeam> | null {
  const { competitors } = event;
  if (!competitors) return null;

  return competitors.reduce(
    (obj, val) => {
      const { homeAway } = val;
      obj[homeAway] = clientCompetitorToFastcastTeam(val, event);
      return obj;
    },
    {} as Record<string, FastcastEventTeam>
  );
}

export function clientEventToFastcastEvent(event: IEventsEntity): FastcastEvent {
  const baseballSituation = addBaseballSituationToFastcastEvent(event);
  const footballSituation = addFootballSituationToFastcastEvent(event);
  const teams = addCompetitorsToFastcastEvent(event);

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
      type: { state, completed, id: statusId },
    },
    odds,
    note,
    clock,
    seriesSummary,
    situation,
  } = event;

  const isHalftime = event?.fullStatus.type?.id ? event?.fullStatus.type.id === EVENT_STATUS_TYPE.Halftime : false;

  return {
    id,
    uid,
    eventIds: parseEventUidStringToId(uid),
    timestamp: new Date(date).getTime(),
    state,
    completed,
    status,
    statusId,
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
    isHalftime,
    lastPlay: situation?.lastPlay ?? null,
    link,
    odds: odds ?? null,
    baseballSituation,
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
  return `${FASTCAST_EVENT_TYPE.LIVE_GAME}-${sport}-${league}-${gameId}`;
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
  if (!exists(league)) return `${FASTCAST_EVENT_TYPE.EVENT}-${sport}`;

  return `${FASTCAST_EVENT_TYPE.EVENT}-${sport}-${league}`;
}

/**
 * Returns fastcast event summary
 *
 * @param event
 * @returns
 */
export function fastcastEventSummary(event: FastcastEvent): string | null {
  const { status, statusId, seasonType, note, timestamp, summary } = event;

  const tickerDate = new EspnDateHelper().tickerDate;

  const defaultPregame = tickerDate(timestamp);
  const defaultInProgress =
    statusId === EVENT_STATUS_TYPE.RainDelay ? `Rain Delay, ${summary}` : statusId === EVENT_STATUS_TYPE.Halftime ? 'Halftime' : summary;

  const postSeasonPregame = exists(note) ? `${note} | ${tickerDate(timestamp)}` : tickerDate(timestamp);
  const postSeasonPostgame = exists(note) ? `${note}, ${summary}` : summary;

  const eventSummary: EventSummaryBySeasonTypeByEventStatus = {
    [SEASON_TYPE.Preseason]: {
      [EVENT_STATUS.Pre]: defaultPregame,
      [EVENT_STATUS.InProgress]: defaultInProgress,
      [EVENT_STATUS.Postgame]: summary,
    },
    [SEASON_TYPE.Regular]: {
      [EVENT_STATUS.Pre]: defaultPregame,
      [EVENT_STATUS.InProgress]: defaultInProgress,
      [EVENT_STATUS.Postgame]: summary,
    },
    [SEASON_TYPE.Postseason]: {
      [EVENT_STATUS.Pre]: postSeasonPregame,
      [EVENT_STATUS.InProgress]: defaultInProgress,
      [EVENT_STATUS.Postgame]: postSeasonPostgame,
    },
    [SEASON_TYPE.AllStar]: {
      [EVENT_STATUS.Pre]: postSeasonPregame,
      [EVENT_STATUS.InProgress]: defaultInProgress,
      [EVENT_STATUS.Postgame]: postSeasonPostgame,
    },
    [SEASON_TYPE.OffSeason]: {
      [EVENT_STATUS.Pre]: postSeasonPregame,
      [EVENT_STATUS.InProgress]: defaultInProgress,
      [EVENT_STATUS.Postgame]: postSeasonPostgame,
    },
    [SEASON_TYPE.Unknown]: {
      [EVENT_STATUS.Pre]: postSeasonPregame,
      [EVENT_STATUS.InProgress]: defaultInProgress,
      [EVENT_STATUS.Postgame]: postSeasonPostgame,
    },
  };

  if (!exists(seasonType)) throw new Error('Season type unavailable');

  const seasonTypeValid = SEASON_TYPE_LIST.includes(seasonType);

  return eventSummary[seasonTypeValid ? seasonType : SEASON_TYPE.Unknown][status ?? EVENT_STATUS.Pre];
}

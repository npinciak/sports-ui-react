import { IClientPlayerNewsFeedEntity } from '@sdk/espn-client-models/player-news-feed.model';
import { IClientPlayerInfoEntity, IClientSimplePlayerEntity, PlayerOutlooksMap } from '@sdk/espn-client-models/player.model';
import { PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE } from '@sdk/espn-client-models/professional-league-type.const';
import { IClientProLeagueType } from '@sdk/espn-client-models/professional-league-type.model';
import { INJURY_STATUS_LIST, PLAYER_COMPETITION_STATUS, PlayerCompetitionStatus } from '@sdk/injury';
import { INJURY_SEVERITY_BY_INJURY_STATUS } from '@sdk/injury/injury-severity.model';
import { exists } from '@shared/helpers/exists';
import { PositionEntityMap } from '@shared/models';
import { flattenPlayerStats, normalizeName, transformIdToUid } from '../espn-helpers';
import { ImageBuilder } from '../helpers';
import { FantasyPlayerNewsEntity } from '../models/fantasy-player-news-entity.model';
import { FantasyPlayerEntity } from '../models/fantasy-player.model';
import { SportTypeId } from '../models/sport-type.model';

export function transformClientPlayerNewsFeed(feed: IClientPlayerNewsFeedEntity): FantasyPlayerNewsEntity {
  const { id, headline, byline, story, images, links, type } = feed;

  const image = images?.[0]?.url ?? null;

  return {
    id: id.toString(),
    headline,
    byline: byline ?? null,
    story,
    image,
    link: links?.mobile?.href ?? null,
    type,
  };
}

export function clientPlayerOutlook(outlooks?: PlayerOutlooksMap) {
  if (!exists(outlooks)) return [];

  const weeklyOutlook = outlooks.outlooksByWeek;

  if (!exists(weeklyOutlook)) return [];

  return Object.keys(weeklyOutlook)
    .map(k => ({
      week: Number(k),
      outlook: weeklyOutlook[k],
    }))
    .sort((a, b) => b.week - a.week);
}

interface IClientPlayerToFantasyPlayerParams {
  clientPlayer: IClientPlayerInfoEntity;
  sportId: SportTypeId;
  leagueId: IClientProLeagueType;
  teamMap: Record<string, string>;
  positionMap: PositionEntityMap;
}

interface IClientSimplePlayerToFantasyPlayerParams {
  clientPlayer: IClientSimplePlayerEntity;
  sportId: SportTypeId;
  leagueId: IClientProLeagueType;
  teamMap: Record<string, string>;
  positionMap: PositionEntityMap;
}

export function clientSimplePlayerToFantasyPlayer({
  clientPlayer,
  sportId,
  leagueId,
  teamMap,
  positionMap,
}: IClientSimplePlayerToFantasyPlayerParams): FantasyPlayerEntity {
  const { id, proTeamId, fullName, defaultPositionId, ownership } = clientPlayer;

  const team = teamMap[proTeamId] as string;
  const league = PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE[leagueId].toLowerCase();

  return {
    id: id.toString(),
    sportsUiId: `name=${normalizeName(fullName)}~team=${team.toLowerCase()}`,
    name: fullName,
    teamUid: transformIdToUid(sportId, leagueId, proTeamId),
    position: positionMap[defaultPositionId]?.abbrev,
    img: ImageBuilder({ league }).headshotImgBuilder({ id }),
    team,
    teamId: proTeamId.toString(),
    lastNewsDate: null,
    health: null,
    defaultPositionId,
    percentOwned: ownership ? ownership.percentOwned : 0,
    percentChange: null,
    percentStarted: null,
    stats: null,
    outlookByWeek: [],
  };
}

export function clientPlayerToFantasyPlayer({
  clientPlayer,
  sportId,
  leagueId,
  teamMap,
  positionMap,
}: IClientPlayerToFantasyPlayerParams): FantasyPlayerEntity {
  const { proTeamId, defaultPositionId, outlooks, id, fullName, ownership, lastNewsDate } = clientPlayer;

  const team = teamMap[proTeamId] as string;
  const stats = flattenPlayerStats(clientPlayer.stats);
  const outlookByWeek = clientPlayerOutlook(outlooks);
  const injuryStatus = exists(clientPlayer.injuryStatus) ? clientPlayer.injuryStatus : PLAYER_COMPETITION_STATUS.Active;
  const league = PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE[leagueId].toLowerCase();

  return {
    id: id.toString(),
    sportsUiId: `name=${normalizeName(fullName)}~team=${team.toLowerCase()}`,
    name: fullName,
    teamId: proTeamId.toString(),
    teamUid: transformIdToUid(sportId, leagueId, proTeamId),
    position: positionMap[defaultPositionId].abbrev,
    img: ImageBuilder({ league }).headshotImgBuilder({ id }),
    lastNewsDate,
    health: {
      isActive: injuryStatus === PLAYER_COMPETITION_STATUS.Active,
      isHealthy: false,
      isInjured: INJURY_STATUS_LIST.includes(injuryStatus as PlayerCompetitionStatus),
      injuryStatus,
      injurySeverity: INJURY_SEVERITY_BY_INJURY_STATUS[injuryStatus],
    },
    stats,
    team,
    defaultPositionId,
    outlookByWeek,
    percentOwned: ownership ? ownership.percentOwned : 0,
    percentChange: ownership ? ownership.percentChange : 0,
    percentStarted: ownership ? ownership.percentStarted : 0,
  };
}

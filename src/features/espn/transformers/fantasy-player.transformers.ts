import {
  PLAYER_INJURY_STATUS,
  PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE,
  PlayerInfo,
  PlayerOutlooksMap,
  ProLeagueType,
  SportType,
  exists,
} from 'sports-ui-sdk';
import { PositionEntityMap } from '../../../@shared/models';
import { flattenPlayerStats, normalizeName, transformIdToUid } from '../espn-helpers';
import { ImageBuilder } from '../helpers';
import { FantasyPlayer } from '../models/fantasy-player.model';

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

export function clientPlayerToFantasyPlayer({
  clientPlayer,
  sport,
  leagueId,
  teamMap,
  positionMap,
}: {
  clientPlayer: PlayerInfo;
  sport: SportType;
  leagueId: ProLeagueType;
  teamMap: Record<string, string>;
  positionMap: PositionEntityMap;
}): FantasyPlayer {
  const { proTeamId, defaultPositionId, injured, outlooks, id, fullName, ownership, lastNewsDate } = clientPlayer;

  const team = teamMap[proTeamId] as string;
  const stats = flattenPlayerStats(clientPlayer.stats);
  const outlookByWeek = clientPlayerOutlook(outlooks);
  const injuryStatus = exists(clientPlayer.injuryStatus) ? clientPlayer.injuryStatus : PLAYER_INJURY_STATUS.Active;
  const league = PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE[leagueId].toLowerCase();

  return {
    id: id.toString(),
    sportsUiId: `name=${normalizeName(fullName)}~team=${team.toLowerCase()}`,
    name: fullName,
    teamId: proTeamId.toString(),
    teamUid: transformIdToUid(sport, leagueId, proTeamId),
    position: positionMap[defaultPositionId].abbrev,
    img: ImageBuilder({ sport, league }).headshotImgBuilder({ id }),
    lastNewsDate,
    injured,
    stats,
    team,
    injuryStatus,
    defaultPositionId,
    outlookByWeek,
    percentOwned: ownership ? ownership.percentOwned : 0,
    percentChange: ownership ? ownership.percentChange : 0,
    percentStarted: ownership ? ownership.percentStarted : 0,
  };
}

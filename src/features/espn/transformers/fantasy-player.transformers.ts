import {
  PLAYER_INJURY_STATUS,
  PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE,
  PlayerInfo,
  PlayerOutlooksMap,
  ProLeagueType,
  exists,
} from 'sports-ui-sdk';
import { PlayerNewsFeedEntity } from 'sports-ui-sdk/src/lib/espn/models/espn-client.model';
import { PositionEntityMap } from '../../../@shared/models';
import { flattenPlayerStats, normalizeName, transformIdToUid } from '../espn-helpers';
import { ImageBuilder } from '../helpers';
import { FantasyPlayerNewsEntity } from '../models/fantasy-player-news-entity.model';
import { FantasyPlayer } from '../models/fantasy-player.model';
import { SportTypeId } from '../models/sport-type.model';

export function transformClientPlayerNewsFeed(feed: PlayerNewsFeedEntity): FantasyPlayerNewsEntity {
  const { id, headline, byline, story, images, links } = feed;

  const image = images?.[0]?.url ?? null;

  return {
    id: id.toString(),
    headline,
    byline: byline ?? null,
    story,
    image,
    link: links?.mobile?.href ?? null,
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

export function clientPlayerToFantasyPlayer({
  clientPlayer,
  sportId,
  leagueId,
  teamMap,
  positionMap,
}: {
  clientPlayer: PlayerInfo;
  sportId: SportTypeId;
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
    teamUid: transformIdToUid(sportId, leagueId, proTeamId),
    position: positionMap[defaultPositionId].abbrev,
    img: ImageBuilder({ league }).headshotImgBuilder({ id }),
    lastNewsDate,
    injured: injuryStatus === PLAYER_INJURY_STATUS.DTD || injured,
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

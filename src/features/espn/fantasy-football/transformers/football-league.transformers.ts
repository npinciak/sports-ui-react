import {
  EspnClient,
  exists,
  FOOTBALL_LINEUP_MAP,
  FreeAgentEntry,
  NFL_POSITION_MAP,
  NFL_TEAM_MAP,
  ProLeagueType,
  SPORT_TYPE,
  TeamRosterEntry,
} from 'sports-ui-sdk';
import { FantasyPlayer } from '../../models';
import { FantasyLeague } from '../../models/fantasy-league.model';
import { clientPlayerToFantasyPlayer } from '../../transformers/fantasy-player.transformers';
import { FantasyFootballImageBuilder } from '../fantasy-football-image-builder';
import { FootballLeague, FootballPlayer, FootballPlayerFreeAgent, FootballTeam } from '../models';

export function clientLeagueToFootballLeague(res: EspnClient.FootballLeague, genericLeagueSettings: FantasyLeague): FootballLeague {
  const { schedule } = res;
  const teams = res.teams.map(t => clientTeamListToTeamList(t));

  return {
    ...genericLeagueSettings,
    teams,
    schedule,
  };
}

export function clientTeamToFootballTeam(team: EspnClient.FootballTeam): FootballTeam {
  const {
    id,
    abbrev,
    logo,
    name,
    playoffSeed: currentRank,
    record: {
      overall: { wins, losses, ties, pointsAgainst, percentage, pointsFor },
    },
  } = team;

  return {
    id: id.toString(),
    name,
    abbrev,
    logo,
    wins,
    losses,
    ties,
    pointsAgainst,
    percentage,
    pointsFor,
    currentRank,
  };
}

export function clientTeamListToTeamList(team: EspnClient.FootballTeam): FootballTeam {
  const {
    id,
    abbrev,
    logo,
    name,
    playoffSeed: currentRank,
    record: {
      overall: { wins, losses, ties, pointsAgainst, percentage, pointsFor },
    },
  } = team;

  return {
    id: id.toString(),
    name,
    abbrev,
    logo,
    wins,
    losses,
    ties,
    pointsAgainst,
    percentage,
    pointsFor,
    currentRank,
  };
}

export function clientFreeAgentToFootballPlayer(data: FreeAgentEntry[]): FootballPlayerFreeAgent[] {
  return data.map(p => {
    if (!exists(p)) throw new Error('player must be defined');

    const playerInfo = clientPlayerToFantasyPlayer({
      clientPlayer: p.player,
      sport: SPORT_TYPE.Football,
      leagueId: ProLeagueType.NFL,
      teamMap: NFL_TEAM_MAP,
      positionMap: NFL_POSITION_MAP,
    });

    const isDST = playerInfo.defaultPositionId === 16;

    const img = !isDST
      ? FantasyFootballImageBuilder.headshotImgBuilder({ id: playerInfo.id })
      : FantasyFootballImageBuilder.logoImgBuilder({ id: playerInfo.team, height: 40, width: 55 });

    return {
      ...playerInfo,
      img,
      lineupSlotId: playerInfo.defaultPositionId,
      lineupSlot: FOOTBALL_LINEUP_MAP[playerInfo.defaultPositionId].abbrev,
      points: 0, // p.player.appliedStatTotal,
    };
  });
}

export function clientPlayerToFootballPlayer(player: TeamRosterEntry): FootballPlayer {
  const { lineupSlotId, playerPoolEntry } = player;

  if (!exists(playerPoolEntry)) throw new Error('playerPoolEntry must be defined');

  const playerInfo: FantasyPlayer = clientPlayerToFantasyPlayer({
    clientPlayer: playerPoolEntry.player,
    sport: SPORT_TYPE.Football,
    leagueId: ProLeagueType.NFL,
    teamMap: NFL_TEAM_MAP,
    positionMap: NFL_POSITION_MAP,
  });

  const isDST = playerInfo.defaultPositionId === 16;

  const img = !isDST
    ? FantasyFootballImageBuilder.headshotImgBuilder({ id: playerInfo.id })
    : FantasyFootballImageBuilder.logoImgBuilder({ id: playerInfo.team, height: 40, width: 55 });

  return {
    ...playerInfo,
    lineupSlotId,
    img,
    lineupSlot: FOOTBALL_LINEUP_MAP[lineupSlotId].abbrev,
  };
}

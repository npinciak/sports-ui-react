import {
  BASEBALL_LINEUP_MAP,
  BaseballLineupSlot,
  EspnClient,
  FreeAgent,
  MLB_POSITION_MAP,
  MLB_TEAM_MAP,
  PITCHING_LINEUP_IDS,
  ProLeagueType,
  SPORT_TYPE,
  TeamRosterEntry,
  exists,
} from 'sports-ui-sdk';
import { IFantasyLeague } from '../../models';
import { clientPlayerToFantasyPlayer } from '../../transformers/fantasy-player.transformers';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayer } from '../models/baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';

/** @deprecated use transformClientLeagueToBaseballLeagueV2 */
export function transformClientLeagueToBaseballLeague(
  client: EspnClient.BaseballLeague,
  genericLeagueSettings: IFantasyLeague
): BaseballLeague {
  const schedule = client.schedule[0];

  const teams = client.teams.map(t => clientTeamListToTeamList(t));
  const teamsLive = exists(schedule.teams) ? schedule.teams.map(t => clientScheduleTeamListToTeamList(t)) : [];

  return {
    ...genericLeagueSettings,
    teams,
    teamsLive,
    freeAgents: transformEspnFreeAgentToBaseballPlayer(client.players),
  };
}

export function transformEspnFreeAgentToBaseballPlayer(freeAgents: FreeAgent[]): BaseballPlayer[] {
  return freeAgents.map(freeAgent => {
    if (!exists(freeAgent.player)) throw new Error('player.player must be defined');

    const {
      player,
      player: { eligibleSlots, lastNewsDate },
      ratings,
    } = freeAgent;

    const playerInfo = clientPlayerToFantasyPlayer({
      clientPlayer: player,
      sport: SPORT_TYPE.Baseball,
      leagueId: ProLeagueType.MLB,
      teamMap: MLB_TEAM_MAP,
      positionMap: MLB_POSITION_MAP,
    });

    const eligibleLineupSlots = playerEligibleLineupSlotDisplay(eligibleSlots);

    const starterStatusByProGame = freeAgent.player.starterStatusByProGame ?? null;

    return {
      ...playerInfo,
      playerRatings: ratings,
      isPitcher: isPitcher(eligibleSlots),
      lineupSlotId: 0,
      isStarting: false,
      startingStatus: null,
      lineupSlot: null,
      starterStatusByProGame,
      eligibleLineupSlots,
      lastNewsDate,
    };
  });
}

export function clientPlayerToBaseballPlayer(players: TeamRosterEntry[]): BaseballPlayer[] {
  return players.map(player => {
    if (!exists(player.playerPoolEntry)) throw new Error('player.playerPoolEntry must be defined');

    const {
      lineupSlotId,
      playerPoolEntry: {
        player: { lastNewsDate, eligibleSlots },
        ratings,
      },
    } = player;

    const playerInfo = clientPlayerToFantasyPlayer({
      clientPlayer: player.playerPoolEntry.player,
      sport: SPORT_TYPE.Baseball,
      leagueId: ProLeagueType.MLB,
      teamMap: MLB_TEAM_MAP,
      positionMap: MLB_POSITION_MAP,
    });

    const eligibleLineupSlots = playerEligibleLineupSlotDisplay(eligibleSlots);
    const starterStatusByProGame = player.playerPoolEntry.player.starterStatusByProGame ?? null;

    return {
      ...playerInfo,
      playerRatings: ratings,
      isPitcher: isPitcher(eligibleSlots),
      lineupSlotId,
      isStarting: false,
      startingStatus: null,
      lineupSlot: BASEBALL_LINEUP_MAP[lineupSlotId].abbrev,
      starterStatusByProGame,
      eligibleLineupSlots,
      lastNewsDate,
    };
  });
}

export function playerEligibleLineupSlotDisplay(val: BaseballLineupSlot[]) {
  return val
    .filter(slot =>
      [
        BaseballLineupSlot.FirstBase,
        BaseballLineupSlot.SecondBase,
        BaseballLineupSlot.SS,
        BaseballLineupSlot.ThirdBase,
        BaseballLineupSlot.C,
        BaseballLineupSlot.OF,
        BaseballLineupSlot.DH,
        BaseballLineupSlot.SP,
        BaseballLineupSlot.RP,
      ].includes(slot)
    )
    .map(slot => BASEBALL_LINEUP_MAP[slot].abbrev)
    .join(', ');
}

export function isPitcher(eligiblePos: number[]): boolean {
  return eligiblePos.some(posId => PITCHING_LINEUP_IDS.has(posId));
}

export function clientScheduleTeamListToTeamList(team: EspnClient.ScheduleTeam): BaseballTeamLive {
  const { totalPoints, teamId, totalPointsLive, rosterForCurrentScoringPeriod } = team;

  return {
    id: teamId.toString(),
    totalPoints,
    liveScore: exists(totalPointsLive) ? totalPointsLive : 0,
    roster: clientPlayerToBaseballPlayer(rosterForCurrentScoringPeriod.entries),
  };
}

export function clientTeamListToTeamList(team: EspnClient.Team): BaseballTeam {
  const { abbrev, logo, valuesByStat, pointsByStat, name } = team;

  return {
    id: team.id.toString(),
    name,
    abbrev,
    logo,
    roster: clientPlayerToBaseballPlayer(team.roster?.entries),
    totalPoints: team.points,
    liveScore: 0,
    currentRank: team.playoffSeed,
    valuesByStat,
    pointsByStat,
  };
}


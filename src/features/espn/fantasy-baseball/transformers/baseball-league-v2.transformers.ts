import { EspnClient, exists } from 'sports-ui-sdk';
import { FantasyLeague } from '../../models';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayer } from '../models/baseball-player.model';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';

export function clientScheduleTeamListToTeamListV2(team: EspnClient.ScheduleTeam): BaseballTeamLive {
  const { totalPoints, teamId, totalPointsLive } = team;

  return {
    id: teamId.toString(),
    totalPoints,
    liveScore: exists(totalPointsLive) ? totalPointsLive : 0,
    roster: [],
  };
}

export function transformClientLeagueToBaseballLeagueV2(
  client: EspnClient.BaseballLeague,
  genericLeagueSettings: FantasyLeague
): BaseballLeague {
  const schedule = client.schedule[0];

  const teams = client.teams.map(t => clientTeamListToTeamListV2(t));
  // const teamsLive = exists(schedule.teams) ? schedule.teams.map(t => clientTeamListToTeamListV2(t)) : [];

  return {
    ...genericLeagueSettings,
    teams,
    teamsLive: [],
    freeAgents: [],
  };
}

export function clientTeamListToTeamListV2(team: EspnClient.Team): BaseballTeam {
  const { abbrev, logo, valuesByStat, pointsByStat, name } = team;

  return {
    id: team.id.toString(),
    name,
    abbrev,
    logo,
    roster: [] as BaseballPlayer[],
    totalPoints: team.points,
    liveScore: 0,
    currentRank: team.playoffSeed,
    valuesByStat,
    pointsByStat,
  };
}

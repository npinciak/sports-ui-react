import { EspnClient, exists } from 'sports-ui-sdk';
import { FantasyLeague } from '../../models';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballTeam, BaseballTeamLive } from '../models/baseball-team.model';
import { clientPlayerToBaseballPlayer } from './baseball-league.transformers';

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
  // const schedule = client.schedule[0];

  const teams = client.teams.map(t => clientLeagueTeamListToLeagueTeamList(t));
  // const teamsLive = exists(schedule.teams) ? schedule.teams.map(t => clientTeamListToTeamListV2(t)) : [];

  return {
    ...genericLeagueSettings,
    teams,
    teamsLive: [],
    freeAgents: [],
  };
}

export function clientLeagueTeamListToLeagueTeamList(team: EspnClient.Team): Omit<BaseballTeam, 'roster'> {
  const { abbrev, logo, valuesByStat, pointsByStat, name } = team;

  return {
    id: team.id.toString(),
    name,
    abbrev,
    logo,
    totalPoints: team.points,
    currentRank: team.playoffSeed,
    valuesByStat,
    pointsByStat,
    liveScore: 0,
  };
}

export function clientTeamToBaseballTeam(team: EspnClient.Team): BaseballTeam {
  const {
    roster: { entries },
  } = team;

  const basicTeam = clientLeagueTeamListToLeagueTeamList(team);

  const roster = clientPlayerToBaseballPlayer(entries);

  return {
    ...basicTeam,
    roster,
  };
}

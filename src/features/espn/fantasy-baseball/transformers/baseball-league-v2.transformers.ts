import { EspnClient, exists } from 'sports-ui-sdk';
import { FangraphsPlayerProjectionEntity } from '../../../../@shared/fangraphs';
import { IFantasyLeague } from '../../models';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayer } from '../models/baseball-player.model';
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
  genericLeagueSettings: IFantasyLeague
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

export function clientLeagueTeamListToLeagueTeamList(
  team: EspnClient.Team & { tradeBlock: { players: Record<string, 'UNTOUCHABLE' | 'ON_THE_BLOCK'> | undefined } }
): Omit<BaseballTeam, 'roster'> {
  const { abbrev, logo, valuesByStat, pointsByStat, name, tradeBlock } = team;

  const hasTradeablePlayers = tradeBlock.hasOwnProperty('players')
    ? Object.values(tradeBlock.players as Record<string, 'UNTOUCHABLE' | 'ON_THE_BLOCK'>).some(p => p === 'ON_THE_BLOCK')
    : false;

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
    hasTradeablePlayers,
  };
}

export function clientTeamToBaseballTeam(
  team: EspnClient.Team & { tradeBlock: { players: Record<string, 'UNTOUCHABLE' | 'ON_THE_BLOCK'> | undefined } }
): BaseballTeam {
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

export function mapFangraphsPlayersToBaseballTeam(
  espnPlayers: BaseballPlayer[],
  fangraphsPlayerMap: Record<string, FangraphsPlayerProjectionEntity>
) {
  return espnPlayers?.map(player => {
    return fangraphsPlayerMap
      ? {
          ...player,
          fangraphsProjection: {
            ...(fangraphsPlayerMap[player.sportsUiId] as object),
          },
        }
      : null;
  });
}

export function mapBaseballTeamToFangraphsPlayers(espnPlayers: BaseballPlayer[], fangraphsPlayerMap: Record<string, unknown>) {
  return espnPlayers?.map(player => {
    return fangraphsPlayerMap
      ? {
          ...player,
          fangraphsProjection: {
            ...(fangraphsPlayerMap[player.sportsUiId] as object),
          },
        }
      : null;
  });
}

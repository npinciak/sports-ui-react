import { IClientProLeagueType, IClientTeamEntity, IClientTeamRosterEntity } from '@sdk/espn-client-models';
import { NFL_POSITION_MAP } from '@sdk/espn-client-models/football/position/nfl-position.const';
import { NFL_TEAM_MAP } from '@sdk/espn-client-models/football/team/nfl-team.const';
import { IClientFootballLeague } from '@sdk/espn-client-models/league.model';
import { SPORT_LEAGUE_BY_PRO_LEAGUE_TYPE } from '@sdk/espn-client-models/sport-league.model';
import { exists } from '@shared/helpers/exists';
import { clientLeagueTeamListToLeagueTeamList } from '../../fantasy-baseball/transformers';
import { FantasyPlayerEntity, IFantasyLeague } from '../../models';
import { SPORT_TYPE_ID } from '../../models/sport-type.model';
import { clientPlayerToFantasyPlayer } from '../../transformers/fantasy-player.transformers';
import { FootballImageHelper } from '../helpers/football-image.helper';
import { FootballLeague } from '../models/football-league.model';
import { FootballPlayerEntity } from '../models/football-player.model';
import { FootballTeamEntity } from '../models/football-team.model';

export function transformClientLeagueToFootballLeague(
  client: IClientFootballLeague,
  genericLeagueSettings: IFantasyLeague
): FootballLeague {
  const teams = client.teams.map(team => clientLeagueTeamListToLeagueTeamList(team));

  return {
    ...genericLeagueSettings,
    teams,
    teamsLive: [],
    freeAgents: [],
    transactions: [],
  };
}

export function clientTeamToFootballTeam(team: IClientTeamEntity): FootballTeamEntity {
  const {
    roster: { entries },
  } = team;

  const basicTeam = clientLeagueTeamListToLeagueTeamList(team);

  const roster = entries.map(player => clientPlayerToFootballPlayer(player));

  return {
    ...basicTeam,
    roster,
  };
}

export function clientPlayerToFootballPlayer(player: IClientTeamRosterEntity): FootballPlayerEntity {
  const { lineupSlotId, playerPoolEntry } = player;

  if (!exists(playerPoolEntry)) throw new Error('playerPoolEntry must be defined');

  const playerInfo: FantasyPlayerEntity = clientPlayerToFantasyPlayer({
    clientPlayer: playerPoolEntry.player,
    sportId: SPORT_TYPE_ID.FOOTBALL,
    leagueId: IClientProLeagueType.NFL,
    teamMap: NFL_TEAM_MAP,
    positionMap: NFL_POSITION_MAP,
    sportLeagueMap: SPORT_LEAGUE_BY_PRO_LEAGUE_TYPE,
  });

  const isDST = playerInfo.defaultPositionId === 16;

  const img = !isDST
    ? FootballImageHelper.headshotImgBuilder({ id: playerInfo.id })
    : FootballImageHelper.teamLogoImgBuilder({ id: playerInfo.team, height: 40, width: 55 });

  return {
    ...playerInfo,
    lineupSlotId,
    img,
    lineupSlot: null, // FOOTBALL_LINEUP_MAP[lineupSlotId].abbrev,
  };
}

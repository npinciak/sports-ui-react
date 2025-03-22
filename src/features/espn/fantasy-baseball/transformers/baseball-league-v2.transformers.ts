import {
  ClientTradeBlockStatus,
  ClientTransactionStatus,
  IClientLeagueTransactionEntity,
  IClientLeagueTransactionItemEntity,
  IClientProLeagueType,
  IClientScheduleTeamEntity,
  IClientSimplePlayerEntity,
  IClientTeamEntity,
  IClientTeamRosterEntity,
  TRADE_BLOCK_STATUS,
  TRANSACTION_STATUS,
} from '@sdk/espn-client-models';
import { BASEBALL_LINEUP_MAP, PITCHING_LINEUP_IDS } from '@sdk/espn-client-models/baseball/lineup/lineup.const';
import { ClientBaseballLineupSlot } from '@sdk/espn-client-models/baseball/lineup/lineup.model';
import { MLB_POSITION_MAP } from '@sdk/espn-client-models/baseball/position/mlb-position.model';
import { MLB_TEAM_MAP } from '@sdk/espn-client-models/baseball/team/mlb-team.const';
import { IClientBaseballLeague } from '@sdk/espn-client-models/league.model';
import { LineupEntityMap } from '@sdk/espn-client-models/lineup.model';
import { FangraphsPlayerProjectionEntity } from '@shared/fangraphs';
import { exists } from '@shared/helpers/exists';
import * as DateFns from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { EspnDateHelper } from '../../fastcast/helpers/espn-date-helper';
import { IFantasyLeague } from '../../models/fantasy-league.model';
import { SPORT_TYPE_ID } from '../../models/sport-type.model';
import { clientPlayerToFantasyPlayer, clientSimplePlayerToFantasyPlayer } from '../../transformers/fantasy-player.transformers';
import { BaseballLeague } from '../models/baseball-league.model';
import { BaseballPlayerEntity } from '../models/baseball-player.model';
import { BaseballTeamEntity, BaseballTeamLiveEntity, BaseballTeamNoRosterEntity } from '../models/baseball-team.model';
import { BaseballTransactionEntity } from '../models/baseball-transaction.model';

export function clientScheduleTeamListToTeamListV2(team: IClientScheduleTeamEntity): BaseballTeamLiveEntity {
  const { totalPoints, teamId, totalPointsLive } = team;

  return {
    id: teamId.toString(),
    totalPoints,
    liveScore: exists(totalPointsLive) ? totalPointsLive : 0,
    roster: [],
  };
}

export function clientSimplePlayerToBaseballPlayer(clientPlayer: IClientSimplePlayerEntity): BaseballPlayerEntity {
  const { eligibleSlots } = clientPlayer;

  const playerInfo = clientSimplePlayerToFantasyPlayer({
    clientPlayer,
    sportId: SPORT_TYPE_ID.BASEBALL,
    leagueId: IClientProLeagueType.MLB,
    teamMap: MLB_TEAM_MAP,
    positionMap: MLB_POSITION_MAP,
  });

  const eligibleLineupSlots = playerEligibleLineupSlotDisplay(eligibleSlots ?? [], BASEBALL_LINEUP_MAP);

  return {
    ...playerInfo,
    lineupSlotId: ClientBaseballLineupSlot.None,
    isStarting: false,
    startingStatus: null,
    playerRatings: null,
    isPitcher: isPitcher(eligibleSlots ?? [], PITCHING_LINEUP_IDS),
    lineupSlot: null,
    starterStatusByProGame: null,
    eligibleLineupSlots,
  };
}

export function transformClientLeagueToBaseballLeagueV2(
  client: IClientBaseballLeague,
  genericLeagueSettings: IFantasyLeague
): BaseballLeague {
  // const schedule = client.schedule[0];

  const dateHelper = new EspnDateHelper();

  const teams = client.teams.map(t => clientLeagueTeamListToLeagueTeamList(t));
  const transactions = client.transactions ? client.transactions.map(t => transformTransactionToBaseballTransaction(t, dateHelper)) : [];
  // const teamsLive = exists(schedule.teams) ? schedule.teams.map(t => clientTeamListToTeamListV2(t)) : [];

  return {
    ...genericLeagueSettings,
    teams,
    teamsLive: [],
    freeAgents: [],
    transactions,
  };
}

function transformTransactionToBaseballTransaction(
  transaction: IClientLeagueTransactionEntity,
  dateHelper: EspnDateHelper
): BaseballTransactionEntity {
  const { id, memberId, bidAmount, executionType, isPending, status, type, processDate, proposedDate } = transaction;

  const transactionProcessDate = processDate ? DateFns.format(processDate, 'MM-dd-yy', { locale: enUS }) : null;
  const transactionProposedDate = proposedDate ? DateFns.format(proposedDate, 'MM-dd-yy', { locale: enUS }) : null;

  const items = transaction.items?.map(item => transformTransactionItems(item, status)) ?? [];

  return {
    id,
    processedBy: memberId,
    bidAmount,
    executionType,
    isPending,
    status,
    type,
    transactionProcessDateTimestamp: processDate ? processDate : null,
    transactionProposedDateTimestamp: proposedDate ? proposedDate : null,
    transactionProcessDate,
    transactionProposedDate,
    items,
  };
}

function transformTransactionItems(item: IClientLeagueTransactionItemEntity, transactionStatus: ClientTransactionStatus) {
  const { playerId, fromLineupSlotId, fromTeamId, toLineupSlotId, toTeamId, type } = item;

  const transactionSuccess = transactionStatus === TRANSACTION_STATUS.Executed;

  return {
    fromLineupSlot: transactionSuccess ? BASEBALL_LINEUP_MAP[fromLineupSlotId].abbrev : null,
    toLineupSlot: transactionSuccess ? BASEBALL_LINEUP_MAP[toLineupSlotId].abbrev : null,
    fromLineupSlotId,
    toLineupSlotId,
    fromTeamId: fromTeamId.toString(),
    toTeamId: toTeamId.toString(),
    playerId: playerId.toString(),
    playerName: null,
    type,
  };
}

export function playerEligibleLineupSlotDisplay(val: ClientBaseballLineupSlot[], lineupMap: LineupEntityMap): string {
  if (val.length === 0) return 'None';
  return val
    .filter(slot =>
      [
        ClientBaseballLineupSlot.FirstBase,
        ClientBaseballLineupSlot.SecondBase,
        ClientBaseballLineupSlot.SS,
        ClientBaseballLineupSlot.ThirdBase,
        ClientBaseballLineupSlot.C,
        ClientBaseballLineupSlot.OF,
        ClientBaseballLineupSlot.DH,
        ClientBaseballLineupSlot.SP,
        ClientBaseballLineupSlot.RP,
      ].includes(slot)
    )
    .map(slot => lineupMap[slot].abbrev)
    .join(', ');
}

export function isPitcher(eligiblePos: number[], lineupSlotSet: Set<ClientBaseballLineupSlot>): boolean {
  if (eligiblePos.length === 0) return false;
  return eligiblePos.some(posId => lineupSlotSet.has(posId));
}

export function clientLeagueTeamListToLeagueTeamList(team: IClientTeamEntity): BaseballTeamNoRosterEntity {
  const { abbrev, logo, valuesByStat, pointsByStat, name, tradeBlock, transactionCounter } = team;

  const hasTradeablePlayers = tradeBlock.hasOwnProperty('players')
    ? Object.values(tradeBlock.players as Record<string, ClientTradeBlockStatus>).some(p => p === TRADE_BLOCK_STATUS.ON_THE_BLOCK)
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
    transactionCounter,
  };
}

export function clientTeamToBaseballTeam(team: IClientTeamEntity): BaseballTeamEntity {
  const {
    roster: { entries },
  } = team;

  const basicTeam = clientLeagueTeamListToLeagueTeamList(team);

  const roster = entries.map(player => clientPlayerToBaseballPlayer(player));

  return {
    ...basicTeam,
    roster,
  };
}

export function clientPlayerToBaseballPlayer(player: IClientTeamRosterEntity): BaseballPlayerEntity {
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
    sportId: SPORT_TYPE_ID.BASEBALL,
    leagueId: IClientProLeagueType.MLB,
    teamMap: MLB_TEAM_MAP,
    positionMap: MLB_POSITION_MAP,
  });

  const eligibleLineupSlots = playerEligibleLineupSlotDisplay(eligibleSlots, BASEBALL_LINEUP_MAP);
  const starterStatusByProGame = player.playerPoolEntry.player.starterStatusByProGame ?? null;

  return {
    ...playerInfo,
    playerRatings: ratings,
    isPitcher: isPitcher(eligibleSlots ?? [], PITCHING_LINEUP_IDS),
    lineupSlotId,
    isStarting: false,
    startingStatus: null,
    lineupSlot: BASEBALL_LINEUP_MAP[lineupSlotId].abbrev,
    starterStatusByProGame,
    eligibleLineupSlots,
    lastNewsDate,
  };
}

export function mapFangraphsPlayersToBaseballTeam(
  espnPlayers: BaseballPlayerEntity[],
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

export function mapBaseballTeamToFangraphsPlayers(espnPlayers: BaseballPlayerEntity[], fangraphsPlayerMap: Record<string, unknown>) {
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

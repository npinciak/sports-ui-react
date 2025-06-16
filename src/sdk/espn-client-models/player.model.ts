import { PlayerCompetitionStatus } from '../injury/injury-status.model';
import { ClientBaseballLineupSlot } from './baseball/lineup';
import { ClientMlbPosition } from './baseball/position/mlb-position.model';
import { ClientMlbTeam } from './baseball/team/mlb-team.model';
import { IClientPlayerInjustStatusByGameMap } from './game-status.model';
import { IClientPlayerRatingsMapByTimePeriod } from './player-rating.model';
import { IClientPlayerStatsYearEntity } from './player-stats.model';

export interface IClientSimplePlayerEntity {
  defaultPositionId: ClientMlbPosition;
  droppable: boolean;
  eligibleSlots?: ClientBaseballLineupSlot[];
  firstName: string;
  fullName: string;
  id: number;
  lastName: string;
  ownership?: {
    percentOwned: number;
  };
  proTeamId: ClientMlbTeam;
  universeId: number;
}

export interface IClientPlayerEntity {
  id: number;
  player: IClientPlayerInfoEntity;
  ratings: IClientPlayerRatingsMapByTimePeriod;
  appliedStatTotal: number;
}

export interface IClientPlayerInfoEntity {
  id: number;
  proTeamId: number;
  playerId: number;
  defaultPositionId: number;
  fullName: string;
  lastNewsDate: number;
  injured: boolean;
  eligibleSlots: number[];
  injuryStatus?: PlayerCompetitionStatus;
  ownership: IClientPlayerOwnershipEntity;
  outlooks?: PlayerOutlooksMap;
  stats?: IClientPlayerStatsYearEntity[];
  starterStatusByProGame?: IClientPlayerInjustStatusByGameMap;
}

export type PlayerOutlooks = Record<string, string>;
export type PlayerOutlooksMap = { outlooksByWeek?: PlayerOutlooks };

type PlayerOwnershipAttributes = 'averageDraftPosition' | 'percentChange' | 'percentOwned' | 'percentStarted';
export type IClientPlayerOwnershipEntity = { [prop in PlayerOwnershipAttributes]: number };

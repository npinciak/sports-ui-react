import { IClientPlayerEntity } from './player.model';

export interface IClientTeamRoster {
  entries: IClientTeamRosterEntity[];
}

export interface IClientTeamRosterEntity {
  playerPoolEntry?: IClientPlayerEntity;
  lineupSlotId: number;
  playerId: number;
}

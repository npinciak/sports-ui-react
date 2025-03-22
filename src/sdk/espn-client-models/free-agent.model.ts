import { IClientPlayerEntity, IClientPlayerInfoEntity } from './player.model';

export interface IClientFreeAgentEntity extends IClientPlayerEntity {}
export interface IClientFreeAgentPlayerInfo extends Omit<IClientPlayerInfoEntity, 'playerId'> {}

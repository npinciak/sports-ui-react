import { IClientPlayerEntity, IClientPlayerInfoEntity } from './player.model';

export interface IClientPlayerCardEntity extends Pick<IClientPlayerEntity, 'ratings'> {
  playerId: number;
  player: IClientPlayerInfoEntity & {
    stance: PlayerStance;
    laterality: PlayerLaterality;
  };
}

export type PlayerStance = (typeof STANCE)[keyof typeof STANCE];

export const STANCE = {
  Left: 'LEFT',
  Right: 'RIGHT',
  Both: 'BOTH',
} as const;

export type PlayerLaterality = (typeof LATERALITY)[keyof typeof LATERALITY];

export const LATERALITY = {
  Left: 'LEFT',
  Right: 'RIGHT',
} as const;

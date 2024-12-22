import { BaseAthleteEntity } from './athlete-entity.model';
import { EntityBase } from './entity.model';
import { ITeamAttributesEntity } from './team-attributes.model';

export interface ILastPlayEntity extends Pick<EntityBase, 'id'> {
  type: ILastPlayType;
  text: string;
  scoreValue: number;
  team?: Pick<ITeamAttributesEntity, 'id'> | null;
  athletesInvolved?: IAthletesInvolvedEntity[] | null;
}

export interface ILastPlayType extends Pick<EntityBase, 'id'> {
  text: string;
  abbreviation?: string | null;
}

export interface IAthletesInvolvedEntity extends BaseAthleteEntity<string> {
  team: Pick<ITeamAttributesEntity, 'id'>;
}

import { IBaseAthleteEntity } from './athlete-entity.model';
import { IEntityBase } from './entity.model';
import { ITeamAttributesEntity } from './team-attributes.model';

export interface ILastPlayEntity extends Pick<IEntityBase, 'id'> {
  type: ILastPlayType;
  text: string;
  scoreValue: number;
  team?: Pick<ITeamAttributesEntity, 'id'> | null;
  athletesInvolved?: IAthletesInvolvedEntity[] | null;
}

export interface ILastPlayType extends Pick<IEntityBase, 'id'> {
  text: string;
  abbreviation?: string | null;
}

export interface IAthletesInvolvedEntity extends IBaseAthleteEntity<string> {
  team: Pick<ITeamAttributesEntity, 'id'>;
}

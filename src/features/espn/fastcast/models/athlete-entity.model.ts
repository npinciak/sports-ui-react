import { ITeamAttributesEntity } from './team-attributes.model';

export interface IBaseAthleteEntity {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  headshot: string;
  jersey: string;
  position: string;
}

export interface IAthleteEntity extends IBaseAthleteEntity {
  team: ITeamAttributesEntity;
  lastName?: string | null;
  active: boolean;
}

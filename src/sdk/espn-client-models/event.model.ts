import { IClientCompetitorEntity } from './competitor.model';

export interface IClientEventEntity {
  id: string;
  uid: string;
  date: string;
  summary: string;
  percentComplete: number;
  competitors: IClientCompetitorEntity[];
  fullStatus: FullEventStatusEntity;
}

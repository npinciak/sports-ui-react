import { ClientEventStatus } from '@sdk/espn-client-models/event-status.model';
import { ClientSeasonType } from '@sdk/espn-client-models/season-type.model';
import { ICompetitorsEntity } from './competitors-entity.model';
import { IEntityBase } from './entity.model';
import { IFullStatusEntity } from './full-status.model';
import { INotesEntity } from './notes-entity.model';
import { OddsEntity } from './odds-entity.model';
import { ISituationEntity } from './situation.model';

export interface IEventsEntity extends Omit<IEntityBase, 'abbreviation' | 'slug'> {
  competitionId: string;
  date: string;
  location: string;
  season: number;
  seasonType: ClientSeasonType;
  period: number;
  clock: string;
  status: ClientEventStatus;
  summary: string;
  fullStatus: IFullStatusEntity;
  link: string;
  odds?: OddsEntity;
  seriesSummary?: string | null;
  competitors?: ICompetitorsEntity[];
  situation?: ISituationEntity | null;
  week?: number | null;
  weekText?: string | null;
  note?: string | null;
  notes?: INotesEntity[];
}

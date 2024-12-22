import { EventStatus } from 'sports-ui-sdk/src/lib/espn-client/models/event-status.model';
import { SeasonType } from 'sports-ui-sdk/src/lib/espn-client/models/season-type.model';
import { ICompetitorsEntity } from './competitors-entity.model';
import { EntityBase } from './entity.model';
import { IFullStatusEntity } from './full-status.model';
import { INotesEntity } from './notes-entity.model';
import { OddsEntity } from './odds-entity.model';
import { ISituationEntity } from './situation.model';

export interface IEventsEntity extends Omit<EntityBase, 'abbreviation' | 'slug'> {
  competitionId: string;
  date: string;
  location: string;
  season: number;
  seasonType: SeasonType;
  period: number;
  clock: string;
  status: EventStatus;
  summary: string;
  fullStatus: IFullStatusEntity;
  link: string;
  odds?: OddsEntity;
  seriesSummary?: string | null;
  competitors?: ICompetitorsEntity[] | null;
  situation?: ISituationEntity | null;
  week?: number | null;
  weekText?: string | null;
  note?: string | null;
  notes?: INotesEntity[] | null;
}

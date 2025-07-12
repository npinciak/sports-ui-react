import { IClientCompetitorEntity } from '@sdk/espn-client-models/competitor.model';
import { IClientEventEntity } from '@sdk/espn-client-models/event.model';

type CompetitorEntity = Pick<IClientCompetitorEntity, 'id' | 'abbreviation' | 'homeAway'>;

export type BaseballEvent = Pick<IClientEventEntity, 'id' | 'uid'> & {
  competitors: Record<string, CompetitorEntity>;
  timestamp: number;
};

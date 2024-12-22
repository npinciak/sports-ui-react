import { EventStatus, EventStatusType } from 'sports-ui-sdk';
import { ParsedUid } from '../../espn-helpers';
import { IEventsEntity } from './events-entity.model';
import { FastcastEventTeam } from './fastcast-team.model';
import { IFullStatus } from './full-status.model';
import { OddsEntity } from './odds-entity.model';
import { ISituationEntity } from './situation.model';

interface IFastcastEventAttributes {
  timestamp: number;
  state: string | null;
  status: EventStatus | null;
  statusId: EventStatusType;
  location: string | null;
  clock: string | null;
  summary: string | null;
  period: number | null;
  teams: Record<string, FastcastEventTeam> | null;
  isHalftime: boolean;
  mlbSituation: MlbSituation | null;
  footballSituation: FootballSituation | null;
  isTournament: boolean;
}

export type FastcastEvent = IFastcastEventAttributes &
  Partial<ISituationEntity> &
  Pick<IEventsEntity, 'uid' | 'name' | 'shortName' | 'note' | 'seriesSummary' | 'link' | 'seasonType'> &
  Pick<IFullStatus, 'completed'> & {
    odds: OddsEntity | null;
    eventIds: ParsedUid | null;
  };

export type FastcastEventMap = Record<string, FastcastEvent>;

export type MlbSituation = Pick<ISituationEntity, 'balls' | 'strikes' | 'outs' | 'onFirst' | 'onSecond' | 'onThird' | 'batter' | 'pitcher'>;

export type FootballSituation = Pick<ISituationEntity, 'isRedZone' | 'possession' | 'shortDownDistanceText' | 'possessionText'>;

import { ClientEventStatus, ClientEventStatusType } from '@sdk/espn-client-models/event-status.model';
import { ParsedUid } from '../../espn-helpers';
import { IEventsEntity } from './events-entity.model';
import { FastcastEventTeam } from './fastcast-team.model';
import { IFullStatus } from './full-status.model';
import { OddsEntity } from './odds-entity.model';
import { ISituationEntity } from './situation.model';

interface IFastcastEventAttributes {
  id: string;
  timestamp: number;
  state: string | null;
  status: ClientEventStatus | null;
  statusId: ClientEventStatusType;
  location: string | null;
  clock: string | null;
  summary: string | null;
  period: number | null;
  teams: Record<string, FastcastEventTeam> | null;
  isHalftime: boolean;
  baseballSituation: BaseballSituation | null;
  footballSituation: FootballSituation | null;
  isTournament: boolean;
}

export type FastcastEvent = IFastcastEventAttributes &
  Partial<ISituationEntity> &
  Pick<IEventsEntity, 'uid' | 'name' | 'shortName' | 'note' | 'seriesSummary' | 'link' | 'seasonType'> &
  Pick<IFullStatus, 'completed'> & {
    odds: OddsEntity | null;
    eventIds: ParsedUid | null;
    teams: Record<string, FastcastEventTeam | null> | null;
  };

export type FastcastEventMap = Record<string, FastcastEvent>;

export type BaseballSituation = Pick<
  ISituationEntity,
  'balls' | 'strikes' | 'outs' | 'onFirst' | 'onSecond' | 'onThird' | 'batter' | 'pitcher'
>;

export type FootballSituation = Pick<ISituationEntity, 'isRedZone' | 'possession' | 'shortDownDistanceText' | 'possessionText'>;

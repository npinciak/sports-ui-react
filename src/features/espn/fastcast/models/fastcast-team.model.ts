import { TeamEntity } from '../../../../@shared/models/base-team.model';
import { ParsedUid } from '../../espn-helpers';
import { IAthleteActionEntity } from './athlete-action-entity.model';
import { ICompetitorsEntity } from './competitors-entity.model';

type FastcastEventTeamAttributes = 'score' | 'color' | 'altColor';

type FastcastEventTeamPropsStringNullable = { [key in FastcastEventTeamAttributes]: string | null };
type FastcastEventTeamProperties = FastcastEventTeamPropsStringNullable & {
  eventIds: ParsedUid | null;
  isWinner: boolean;
  isHome: boolean;
  chanceToWinPct: number;
  record: string | null;
  scoringSummary: IAthleteActionEntity[] | null;
};

export type FastcastEventTeam = TeamEntity &
  Pick<ICompetitorsEntity, 'uid' | 'rank' | 'seriesRecord' | 'aggregateScore' | 'logoDark'> &
  FastcastEventTeamProperties;
export type FastcastEventTeamMap = Record<string, FastcastEventTeam>;

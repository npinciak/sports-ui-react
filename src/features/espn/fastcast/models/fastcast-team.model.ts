import { TeamEntity } from '../../../../@shared/models/base-team.model';
import { ParsedUid } from '../../espn-helpers';
import { ICompetitorsEntity } from './competitors-entity.model';

type FastcastEventTeamAttributes = 'score' | 'color' | 'altColor';

type FastcastEventTeamPropsStringNullable = { [key in FastcastEventTeamAttributes]: string | null };
type FastcastEventTeamProperties = FastcastEventTeamPropsStringNullable & {
  eventIds: ParsedUid | null;
  isWinner: boolean;
  isHome: boolean;
  winPct: number | null;
  record: string | null;
};

export type FastcastEventTeam = TeamEntity &
  Pick<ICompetitorsEntity, 'uid' | 'rank' | 'seriesRecord' | 'aggregateScore' | 'logoDark'> &
  FastcastEventTeamProperties;
export type FastcastEventTeamMap = Record<string, FastcastEventTeam>;

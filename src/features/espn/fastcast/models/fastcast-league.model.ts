import { LeagueEntity } from '../../../../@shared/models/base-league.model';
import { ILeaguesEntity } from './leagues-entity.model';

type FastcastLeagueAttributes = Pick<ILeaguesEntity, 'uid' | 'shortName' | 'isTournament' | 'slug'> & { sport?: string };

export type FastcastLeague = LeagueEntity & FastcastLeagueAttributes;
export type FastcastLeagueMap = Record<string, FastcastLeague>;

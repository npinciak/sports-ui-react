import { LeagueEntity } from '@shared/models/base-league.model';
import { ILeaguesEntity } from './leagues-entity.model';

type FastcastLeagueAttributes = Pick<ILeaguesEntity, 'uid' | 'shortName' | 'isTournament' | 'slug'>;

export type UIFastcastLeague = LeagueEntity & FastcastLeagueAttributes;
export type FastcastLeagueMap = Record<string, UIFastcastLeague>;

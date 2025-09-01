import { FANTASY_SPORTS_ABBREVIATION, SPORT_LEAGUE } from '../../helpers/endpoint-builder/endpoint-builder.const';
import { ImageBuilder } from '../../helpers/image-builder/image-builder';

export class FootballImageHelper extends ImageBuilder({ league: SPORT_LEAGUE.NFL, sport: FANTASY_SPORTS_ABBREVIATION.Football }) {}

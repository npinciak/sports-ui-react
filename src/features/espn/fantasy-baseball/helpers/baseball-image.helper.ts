import { FANTASY_SPORTS_ABBREVIATION, SPORT_LEAGUE } from '../../helpers/endpoint-builder/endpoint-builder.const';
import { ImageBuilder } from '../../helpers/image-builder/image-builder';

export class BaseballImageHelper extends ImageBuilder({ league: SPORT_LEAGUE.MLB, sport: FANTASY_SPORTS_ABBREVIATION.Baseball }) {}

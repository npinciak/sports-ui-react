import { SPORT_TYPE, PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE, ProLeagueType } from "sports-ui-sdk";
import { ImageBuilder } from "../helpers";

const config = {
  sport: SPORT_TYPE.Football,
  league: PRO_LEAGUE_ABBREV_BY_PRO_LEAGUE_TYPE[ProLeagueType.NFL].toLowerCase(),
};

export class FantasyFootballImageBuilder extends ImageBuilder(config) {}

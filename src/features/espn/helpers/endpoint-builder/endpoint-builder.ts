import { API_BASE_V2, BASE_URL, COMMON_V3, FANTASY_BASE_V3, ONE_FEED_BASE } from '../../constants';
import { ESPN_PATH_FRAGMENTS, FANTASY_SPORTS_ABBREVIATION } from './endpoint-builder.const';
import { BaseEspnEndpointBuilderClass, FantasySportToSportsMap, FantasySportsAbbreviation } from './endpoint-builder.model';

export function BaseEspnEndpointBuilder({
  sport = FANTASY_SPORTS_ABBREVIATION.Baseball,
  leagueId,
  year = new Date().getFullYear().toString(),
}: {
  sport?: FantasySportsAbbreviation;
  leagueId?: string;
  year?: string;
}): BaseEspnEndpointBuilderClass {
  return class BaseEspnEndpointBuilderClass {
    private static readonly espnBase = BASE_URL;
    private static readonly apiBaseV2 = API_BASE_V2;
    private static readonly fantasyBaseV3 = FANTASY_BASE_V3;
    private static readonly oneFeedBase = ONE_FEED_BASE;
    private static readonly commonV3 = COMMON_V3;

    static get fantasyPlayerNews(): string {
      return `${this.fantasyBaseV3WithFragments}/news/players`;
    }

    static get espnEvents(): string {
      return `${this.fantasyBaseV3WithFragments}/games`;
    }

    static get fantasyPlayerTransaction(): string {
      return `${this.fantasyLeague}/transactions`;
    }

    static get fantasyLeagueComms(): string {
      return `${this.fantasyLeague}/communication`;
    }

    static get fantasyLeague(): string {
      return `${this.fantasyBaseV3WithFragments}/segments/0/leagues/${leagueId}`;
    }

    static get positions(): string {
      return `${BaseEspnEndpointBuilderClass.commonV3}/${sport}/mlb/positions`;
    }

    static get oneFeed(): string {
      return `${BaseEspnEndpointBuilderClass.oneFeedBase}/oneFeed`;
    }

    static get staticScoreboard(): string {
      return `${BaseEspnEndpointBuilderClass.apiBaseV2}/scoreboard/header`;
    }

    static get leagueClickout(): string {
      return `${this.espnBase}/${FantasySportToSportsMap[sport]}/standings?leagueId=${leagueId}&seasonId=${year}`;
    }

    static matchupClickout(teamId: string | number, matchupPeriodId: string | number): string {
      return `${this.espnBase}/${FantasySportToSportsMap[sport]}/boxscore?leagueId=${leagueId}&matchupPeriodId=${matchupPeriodId}&seasonId=${year}&teamId=${teamId}`;
    }

    static get baseballStatsBatterVsPitcher(): string {
      return `${this.fantasyBaseV2WithStatsFragments}/${ESPN_PATH_FRAGMENTS.BatterVsPitcher}`;
    }

    static get fantasyBaseV3WithFragments(): string {
      return `${BaseEspnEndpointBuilderClass.fantasyBaseV3}/games/${sport}/seasons/${year}`;
    }

    private static get fantasyBaseV2WithStatsFragments(): string {
      return `${this.fantasyBaseV3WithFragments}/${ESPN_PATH_FRAGMENTS.Stats}`;
    }
  };
}

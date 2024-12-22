import { API_BASE_V2, BASE_URL, COMMON_V3, FANTASY_BASE_V2, FANTASY_BASE_V3, FASTCAST_WS_HOST, ONE_FEED_BASE } from '../../constants';
import { FANTASY_SPORTS_ABBREVIATION } from './endpoint-builder.const';
import { BaseEspnEndpointBuilderClass, FantasySportToSportsMap, FantasySportsAbbreviation } from './endpoint-builder.model';

/**
 *
 * @param param0
 * @returns
 *
 * @example
 * const endpoints = BaseEspnEndpointBuilder({ sport: FANTASY_SPORTS_ABBREVIATION.Baseball })
 */
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
    private static readonly fantasyBaseV2 = FANTASY_BASE_V2;
    private static readonly fantasyBaseV3 = FANTASY_BASE_V3;
    private static readonly oneFeedBase = ONE_FEED_BASE;
    private static readonly commonV3 = COMMON_V3;
    private static readonly webSocketHost = FASTCAST_WS_HOST;

    static get espnFastcastWebSocketHost(): string {
      return `${BaseEspnEndpointBuilderClass.webSocketHost}`;
    }

    static get espnEvents(): string {
      return `${BaseEspnEndpointBuilderClass.fantasyBaseV2WithFragments}/games`;
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

    static get fantasyBaseV3Seasons(): string {
      return `${BaseEspnEndpointBuilderClass.fantasyBaseV3}/games/${sport}/seasons`;
    }

    static fantasyBaseV3LeagueBySeasonById(year: string, leagueId: string): string {
      return `${BaseEspnEndpointBuilderClass.fantasyBaseV3SeasonByYear(year)}/segments/0/leagues/${leagueId}`;
    }

    static fantasyBaseV3SeasonByYear(year: string): string {
      return `${BaseEspnEndpointBuilderClass.fantasyBaseV3Seasons}/${year}`;
    }

    /**
     * expect to be deprecated
     */
    private static get fantasyBaseV2WithFragments(): string {
      return `${BaseEspnEndpointBuilderClass.fantasyBaseV2}/games/${sport}`;
    }
  };
}

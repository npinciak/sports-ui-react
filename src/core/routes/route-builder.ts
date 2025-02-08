import { ROUTE_FRAGMENT } from './routes.model';

export interface LeagueRoute {
  leagueId: number | null;
  sport: string | null;
  season: string | null;
}

export interface TeamRoute extends LeagueRoute {
  teamId: number | null;
}

export function RouteBuilder() {
  return class RouteBuilderClass {
    static teamByTeamIdRoute({ sport, season, leagueId, teamId }: TeamRoute) {
      if (!leagueId || !teamId) return '';

      const leagueRoute = RouteBuilderClass.leagueByLeagueIdRoute({ leagueId, sport, season });
      return `${leagueRoute}/${ROUTE_FRAGMENT.TEAM}/${teamId}`;
    }

    static leagueByLeagueIdRoute({ leagueId, sport, season }: LeagueRoute) {
      if (!leagueId || !sport) return '';
      return `${sport}/${season}/${ROUTE_FRAGMENT.LEAGUE}/${leagueId}`;
    }
  };
}

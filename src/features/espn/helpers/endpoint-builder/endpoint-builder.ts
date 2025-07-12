import { FANTASY_SPORTS_ABBREVIATION } from './endpoint-builder.const';
import { FantasySportsAbbreviation } from './endpoint-builder.model';

interface EspnEndpointBuilderProps {
  fantasySport: FantasySportsAbbreviation;
}

export function EspnEndpointBuilder({ fantasySport }: EspnEndpointBuilderProps) {
  return class EspnEndpointBuilderClass {
    static getLeague(year: string, leagueId: string) {
      return `/games/${fantasySport}/seasons/${year}/segments/0/leagues/${leagueId}`;
    }
  };
}

export class FantasyBaseballEndpointBuilder extends EspnEndpointBuilder({ fantasySport: FANTASY_SPORTS_ABBREVIATION.Baseball }) {}

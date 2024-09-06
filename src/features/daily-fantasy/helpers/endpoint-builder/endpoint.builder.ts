import { SmartDate } from '../../../../@shared/helpers/smart-date';

export function DfsEndpointBuilder() {
  return class DfsEndpointBuilderClass {
    private static readonly dailyFantasyJsonBase = import.meta.env.VITE_DAILY_FANTASY_JSON_BASE;
    protected static readonly dailyFantasyBase = import.meta.env.VITE_DAILY_FANTASY_BASE;
    protected static readonly awsBase = import.meta.env.VITE_AWS_BASE;

    static get masterSlates() {
      const date = new SmartDate().formatWithDelimiter({ date: new Date().getTime(), delimiter: '/' });
      return `${DfsEndpointBuilderClass.baseAws}/v2.00/${date}/slates`;
    }

    static get slates() {
      return `${DfsEndpointBuilderClass.baseAws}/v2.00/slates`;
    }

    static get schedules() {
      return `${DfsEndpointBuilderClass.dailyFantasyBase}/schedules`;
    }

    static gameAttributesBySport(sport: string) {
      return `${this.dailyFantasyBase}/schedules/${sport}/game-attributes`;
    }

    static get lineupHeadquarters() {
      return `${this.baseAws}/lineuphq/slate-definitions-v1.json`;
    }

    static get lineupHeadquartersPlayers(): string {
      const date = new SmartDate().formatWithDelimiter({ date: new Date().getTime(), delimiter: '-' });

      return `${this.baseAws}/lineuphq/v1.00/${date}`;
    }

    protected static get baseAws() {
      return `https://${DfsEndpointBuilderClass.awsBase}/${DfsEndpointBuilderClass.dailyFantasyJsonBase}`;
    }
  };
}

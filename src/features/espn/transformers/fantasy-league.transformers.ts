import { EspnClient } from 'sports-ui-sdk';
import { FantasyLeague } from '../models/fantasy-league.model';

export function clientLeagueToLeague(league: EspnClient.League): FantasyLeague {
  const {
    id,
    seasonId,
    scoringPeriodId,
    status: { firstScoringPeriod, finalScoringPeriod },
    settings: {
      scheduleSettings: { matchupPeriodCount },
    },
    transactions,
  } = league;

  return {
    id: id.toString(),
    seasonId: seasonId.toString(),
    scoringPeriodId: scoringPeriodId.toString(),
    firstScoringPeriod: firstScoringPeriod.toString(),
    finalScoringPeriod: finalScoringPeriod.toString(),
    matchupPeriodCount: matchupPeriodCount.toString(),
    transactions,
  };
}

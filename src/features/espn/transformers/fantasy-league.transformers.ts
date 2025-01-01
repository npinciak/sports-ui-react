import { EspnClient } from 'sports-ui-sdk';
import { IFantasyLeague } from '../models/fantasy-league.model';

export function clientLeagueToLeagueSettings(league: EspnClient.League): IFantasyLeague {
  const {
    id,
    seasonId,
    scoringPeriodId,
    status: { firstScoringPeriod, finalScoringPeriod },
    settings: {
      scheduleSettings: { matchupPeriodCount },
    },
  } = league;

  return {
    id: id.toString(),
    seasonId: seasonId.toString(),
    scoringPeriodId: scoringPeriodId.toString(),
    firstScoringPeriod: firstScoringPeriod.toString(),
    finalScoringPeriod: finalScoringPeriod.toString(),
    matchupPeriodCount: matchupPeriodCount.toString(),
  };
}

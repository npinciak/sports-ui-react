import { IClientLeague } from '@sdk/espn-client-models/league.model';
import { IFantasyLeague } from '../models/fantasy-league.model';

export function clientLeagueToLeagueSettings(league: IClientLeague): IFantasyLeague {
  const {
    id,
    seasonId,
    scoringPeriodId,
    status: { firstScoringPeriod, finalScoringPeriod },
    settings: {
      scheduleSettings: { matchupPeriodCount },
      scoringSettings: { scoringType },
      name,
      size,
    },
  } = league;

  return {
    id: id.toString(),
    name,
    size,
    scoringType,
    seasonId: seasonId.toString(),
    scoringPeriodId: scoringPeriodId.toString(),
    firstScoringPeriod: firstScoringPeriod.toString(),
    finalScoringPeriod: finalScoringPeriod.toString(),
    matchupPeriodCount: matchupPeriodCount.toString(),
  };
}

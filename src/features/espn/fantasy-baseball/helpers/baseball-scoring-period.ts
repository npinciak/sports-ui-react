import { BaseScoringPeriod, ScoringPeriodId } from '../../helpers';

export class BaseballScoringPeriod extends BaseScoringPeriod() {
  static filterOptionListWithWeeks(season: string | null) {
    return [
      { value: BaseballScoringPeriod.seasonToScoringPeriodId(ScoringPeriodId.Last7, season), label: 'Last 7' },
      { value: BaseballScoringPeriod.seasonToScoringPeriodId(ScoringPeriodId.Last15), label: 'Last 15' },
      { value: BaseballScoringPeriod.seasonToScoringPeriodId(ScoringPeriodId.Last30), label: 'Last 30' },
      ...BaseballScoringPeriod.filterOptionList(season),
    ];
  }
}

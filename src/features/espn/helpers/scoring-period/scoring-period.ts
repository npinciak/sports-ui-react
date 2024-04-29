import { exists } from 'sports-ui-sdk';
import { FilterOptions } from '../../../../@shared/models';
import { ScoringPeriodId } from './scoring-period.model';

/**
 * Base function that returns stat scoring periods
 *
 * @example ```typescript
 *
 * BaseScoringPeriodTest.season('2022'); // returns '002022';
 *
 * ```
 */
export function BaseScoringPeriod() {
  class BaseScoringPeriodClass {
    static season(year: string | null) {
      return BaseScoringPeriodClass.seasonToScoringPeriodId(ScoringPeriodId.Season, year);
    }

    static seasonProjection(year: string | null) {
      return BaseScoringPeriodClass.seasonToScoringPeriodId(ScoringPeriodId.Projected, year);
    }

    static lastSeason(year: string | null) {
      const previousSeason = !exists(year) ? new Date().getFullYear() - 2 : Number(year) - 1;
      return BaseScoringPeriodClass.seasonToScoringPeriodId(ScoringPeriodId.Season, previousSeason.toString());
    }

    static liveScoring(eventId: string | null) {
      return BaseScoringPeriodClass.seasonToScoringPeriodId(ScoringPeriodId.Live, eventId);
    }

    static filterOptionList(year: string | null) {
      return [
        {
          value: BaseScoringPeriodClass.season(year),
          label: 'Season',
        },
        {
          value: BaseScoringPeriodClass.seasonProjection(year),
          label: 'Season Proj',
        },
        { value: BaseScoringPeriodClass.lastSeason(year), label: 'Last Season' },
      ];
    }

    static filterOptionMap(year: string | null) {
      return BaseScoringPeriodClass.filterOptionList(year).reduce(
        (acc, val) => {
          acc[val.label] = val;
          return acc;
        },
        {} as Record<string, FilterOptions<string>>
      );
    }

    static projectedWeek(year: string | null, week: string | null) {
      return BaseScoringPeriodClass.seasonToScoringPeriodId(ScoringPeriodId.ProjectedWeek, year, week);
    }

    protected static seasonToScoringPeriodId(scoringPeriodId: ScoringPeriodId, year?: string | null, week?: string | null): string {
      const isProjected = scoringPeriodId === ScoringPeriodId.Projected;

      const season = year ?? new Date().getFullYear();
      const upcomingWeek = week ?? '0';

      if (isProjected) return `${scoringPeriodId}${season}`;

      if (!exists(year) && !isProjected) return `0${scoringPeriodId}${season}`;

      if (exists(week)) return `${scoringPeriodId}${season}${upcomingWeek}`; //1120231

      return `0${scoringPeriodId}${season}`;
    }
  }
  return BaseScoringPeriodClass;
}

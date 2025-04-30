import { getContrastRatio } from '@sdk/color-ratio';
import { IClientPlayerStatsYearEntity } from '@sdk/espn-client-models';
import { ICompetitorsEntity } from './fastcast/models/competitors-entity.model';

/**
 * Leagues to exclude in Fastcast
 *
 * @param id
 * @returns boolean
 */
export function excludeLeagues(id: string): boolean {
  const leagueIds = [
    '14',
    '62',
    '760',
    '102',
    '3923',
    LEAGUE.ENGLISH_W_SOCC,
    '20226',
    LEAGUE.NCAA_W,
    '59',
    '19834',
    '8301',
    '19483',
    '19868',
    '19728',
  ];
  return new Set(leagueIds).has(id);
}

const LEAGUE = {
  NCAA_W: '54',
  ENGLISH_W_SOCC: '8097',
};

export function normalizeName(name: string) {
  return name
    .split(' ')
    .join('')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .toLowerCase();
}

/**
 * Removes and replaces poor contrast team colors
 *
 * @param val
 * @returns string | null
 *
 * @example teamColorHandler()
 */
export function teamColorHandler(val: ICompetitorsEntity | undefined): string | null {
  if (!val) return null;

  const { color, alternateColor } = val;

  if (!color || !alternateColor) return null;

  const validColorRatio = getContrastRatio(color, 'ffffff') <= 2.5;
  const validAlternativeColorRatio = getContrastRatio(alternateColor, 'ffffff') <= 2.5;

  if (validColorRatio && validAlternativeColorRatio) return '#445058';

  return validColorRatio ? `#${alternateColor ?? '445058'}` : `#${color}`;
}

/**
 * Simple string concat to format football situation
 *
 * @param downDistanceText
 * @param possessionText
 *
 * @example transformDownDistancePositionText('1st and 10', 'NE 25') // 1st and 10, NE 25
 *
 */
export function transformDownDistancePositionText(downDistanceText: string | null, possessionText: string | null): string | null {
  if (!downDistanceText || !possessionText) return null;

  return `${downDistanceText}, ${possessionText}`;
}

/**
 * Flatten player stats
 *
 * @param stats
 * @returns
 */
export function flattenPlayerStats(
  stats?: IClientPlayerStatsYearEntity[] | null
): Record<string, IClientPlayerStatsYearEntity | null> | null {
  if (!stats) return null;

  return stats.reduce<Record<string, IClientPlayerStatsYearEntity | null>>((result, stat) => {
    result[stat.id] = stat;
    return result;
  }, {});
}

import { getContrastRatio } from '@sdk/color-ratio';
import { IClientPlayerStatsYearEntity, IClientProLeagueType } from '@sdk/espn-client-models';
import { ICompetitorsEntity } from './fastcast/models/competitors-entity.model';
import { EspnParamsBuilder, EspnParamsHandler } from './helpers/params-handler';
import { SportTypeId } from './models/sport-type.model';

// Re-export for backward compatibility
export { EspnParamsBuilder, EspnParamsHandler };

/**
 * Generates league params
 * @returns URLSearchParams
 * @deprecated Use EspnParamsBuilder.forLeague().build() instead
 */
export function generateLeagueParams(): URLSearchParams {
  return EspnParamsBuilder.forLeague().build();
}

/**
 * Generates player query params
 * @returns URLSearchParams
 * @deprecated Use EspnParamsHandler.generatePlayerParams() instead
 */
export function generatePlayerParams(scoringPeriodId: string): URLSearchParams {
  return EspnParamsHandler.generatePlayerParams(scoringPeriodId);
}

/**
 * Generates team params
 * @param teamId
 * @returns URLSearchParams
 * @deprecated Use EspnParamsHandler.generateTeamParams() instead
 */
export function generateTeamParams(teamId: string): URLSearchParams {
  return EspnParamsHandler.generateTeamParams(teamId);
}

/**
 * Generates event params
 * @param dateRange
 * @returns URLSearchParams
 * @deprecated Use EspnParamsHandler.generateEventParams() instead
 */
export function generateEventParams(dateRange: string): URLSearchParams {
  return EspnParamsHandler.generateEventParams(dateRange);
}

/**
 * Generates pro team schedule params
 * @returns URLSearchParams
 * @deprecated Use EspnParamsHandler.generateProTeamScheduleParams() instead
 */
export function generateProTeamScheduleParams(): URLSearchParams {
  return EspnParamsHandler.generateProTeamScheduleParams();
}

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
 * Transforms uid string to league id
 *
 * @param uid
 * @returns
 *
 * @example transformUidToLeagueId('s:6~l:1~s:4~t:5') // '1'
 */
export function transformUidToLeagueId(uid: string | null): string | null {
  if (!uid) return null;
  return uid.split('~')[1].replace('l:', '');
}

export function transformIdToUid(
  sportType: SportTypeId | null,
  leagueId: IClientProLeagueType | null,
  teamId: string | number | null
): string {
  if (!sportType || !leagueId || !teamId) return '';
  return `s:${sportType}~l:${leagueId}~t:${teamId}`;
}

/**
 *
 *
 * @param str
 * @returns
 */
export function parseEventUidStringToId(str: string): ParsedUid | null {
  const tokens = str.split('~');

  if (tokens.length !== 4) return null;

  const [s, l, e, c] = tokens.map(token => {
    const [key, value] = token.split(':');
    if (key && value) return value;
    return null;
  });

  if (s && l && e && c) return { sportTypeId: s, leagueId: l, eventId: e, competitionId: c };

  return null;
}

export function parseTeamUidStringToId(str: string): ParsedUid | null {
  const tokens = str.split('~');

  if (tokens.length !== 3) return null;

  const [s, l, t] = tokens.map(token => {
    const [key, value] = token.split(':');
    if (key && value) return value;
    return null;
  });

  if (s && l && t) return { sportTypeId: s, leagueId: l, teamId: t };

  return null;
}

export type ParsedUid = {
  sportTypeId: string;
  leagueId: string;
  eventId?: string;
  competitionId?: string;
  teamId?: string;
};

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

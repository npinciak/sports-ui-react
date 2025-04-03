import { getContrastRatio } from '@sdk/color-ratio';
import { IClientPlayerStatsYearEntity, IClientProLeagueType } from '@sdk/espn-client-models';
import { ICompetitorsEntity } from './fastcast/models/competitors-entity.model';
import { ESPN_PARAM_FRAGMENTS, ESPN_VIEW_PARAM_FRAGMENTS } from './helpers/endpoint-builder/endpoint-builder.const';
import { SportTypeId } from './models/sport-type.model';

/**
 * Generates league params
 * @returns URLSearchParams
 */
export function generateLeagueParams(): URLSearchParams {
  const params = new URLSearchParams();
  params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Settings);
  params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.LiveScoring);
  params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Scoreboard);
  params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Status);
  params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Team);
  params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Transactions);
  return params;
}

/**
 * Generates player query params
 * @returns URLSearchParams
 */
export function generatePlayerParams(scoringPeriodId: string): URLSearchParams {
  const params = new URLSearchParams();
  params.append(ESPN_PARAM_FRAGMENTS.ScoringPeriod, scoringPeriodId);
  params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.PlayersWl);
  return params;
}

/**
 * Generates team params
 * @param teamId
 * @returns URLSearchParams
 */
export function generateTeamParams(teamId: string): URLSearchParams {
  const params = new URLSearchParams();
  params.append(ESPN_PARAM_FRAGMENTS.RosterForTeamId, teamId);
  params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Team);
  params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.Roster);
  params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.PendingTransactions);
  params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.PositionalRatings);
  return params;
}

/**
 * Generates team params
 * @param teamId
 * @returns URLSearchParams
 */
export function generateEventParams(dateRange: string): URLSearchParams {
  const params = new URLSearchParams();
  params.append(ESPN_PARAM_FRAGMENTS.UseMap, 'true');
  params.append(ESPN_PARAM_FRAGMENTS.Dates, dateRange);
  params.append(ESPN_PARAM_FRAGMENTS.PbpOnly, 'true');
  return params;
}

/**
 * Generates team params
 * @param teamId
 * @returns URLSearchParams
 */
export function generateProTeamScheduleParams(): URLSearchParams {
  const params = new URLSearchParams();
  params.append(ESPN_PARAM_FRAGMENTS.View, ESPN_VIEW_PARAM_FRAGMENTS.ProTeamSchedules);
  return params;
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

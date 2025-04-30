/**
 * ESPN UID Parser
 *
 * This module provides utilities for parsing and generating ESPN UIDs.
 * ESPN UIDs are string identifiers with a specific format that encodes information
 * about sports, leagues, teams, events, and competitions.
 *
 * Format: segments joined by '~', where each segment is a key:value pair
 * - 's:X' = Sport Type ID
 * - 'l:X' = League ID
 * - 't:X' = Team ID
 * - 'e:X' = Event ID
 * - 'c:X' = Competition ID
 *
 * Examples:
 * - Team UID: 's:6~l:1~t:5' (Sport 6, League 1, Team 5)
 * - Event UID: 's:6~l:1~e:4~c:5' (Sport 6, League 1, Event 4, Competition 5)
 */

import { IClientProLeagueType } from '@sdk/espn-client-models';
import { SportTypeId } from '../../models/sport-type.model';

/**
 * Known segment types in ESPN UIDs
 */
export enum UidSegmentType {
  SPORT = 's',
  LEAGUE = 'l',
  TEAM = 't',
  EVENT = 'e',
  COMPETITION = 'c',
}

/**
 * Interface describing a parsed ESPN UID
 */
export interface ParsedUid {
  sportTypeId?: string;
  leagueId?: string;
  teamId?: string;
  eventId?: string;
  competitionId?: string;
  [key: string]: string | undefined;
}

/**
 * Interface for expected segments in a UID
 */
export interface UidFormat {
  expectedSegments: Array<UidSegmentType>;
  requiredSegments: Array<UidSegmentType>;
}

/**
 * Predefined UID formats
 */
export const UidFormats = {
  TEAM: {
    expectedSegments: [UidSegmentType.SPORT, UidSegmentType.LEAGUE, UidSegmentType.TEAM],
    requiredSegments: [UidSegmentType.SPORT, UidSegmentType.LEAGUE, UidSegmentType.TEAM],
  },
  EVENT: {
    expectedSegments: [UidSegmentType.SPORT, UidSegmentType.LEAGUE, UidSegmentType.EVENT, UidSegmentType.COMPETITION],
    requiredSegments: [UidSegmentType.SPORT, UidSegmentType.LEAGUE, UidSegmentType.EVENT, UidSegmentType.COMPETITION],
  },
};

/**
 * Map from segment type to property name in ParsedUid
 */
const segmentToPropertyMap: Record<UidSegmentType, keyof ParsedUid> = {
  [UidSegmentType.SPORT]: 'sportTypeId',
  [UidSegmentType.LEAGUE]: 'leagueId',
  [UidSegmentType.TEAM]: 'teamId',
  [UidSegmentType.EVENT]: 'eventId',
  [UidSegmentType.COMPETITION]: 'competitionId',
};

/**
 * Base parser for ESPN UIDs
 *
 * @param uidString - The ESPN UID string to parse
 * @param format - Optional format specification for validation
 * @returns Parsed UID object or null if invalid
 *
 * @example
 * // Parse a team UID
 * const teamUid = parseUid('s:6~l:1~t:5', UidFormats.TEAM);
 * // { sportTypeId: '6', leagueId: '1', teamId: '5' }
 *
 * @example
 * // Parse an event UID
 * const eventUid = parseUid('s:6~l:1~e:4~c:5', UidFormats.EVENT);
 * // { sportTypeId: '6', leagueId: '1', eventId: '4', competitionId: '5' }
 */
export function parseUid(uidString: string, format?: UidFormat): ParsedUid | null {
  // Check if input is valid
  if (!uidString || typeof uidString !== 'string') return null;

  // Split the UID string by segments
  const segments = uidString.split('~');

  // Check if we have expected number of segments when format is provided
  if (format && segments.length !== format.expectedSegments.length) return null;

  // Parse each segment
  const result: ParsedUid = {};
  const foundSegmentTypes = new Set<UidSegmentType>();

  for (const segment of segments) {
    // Check if segment has the correct format (key:value)
    const match = segment.match(/^([a-z]):(.+)$/);

    if (!match) return null; // Invalid segment format

    const [, key, value] = match;

    // Check if key is one of our known segment types
    if (!Object.values(UidSegmentType).includes(key as UidSegmentType)) return null; // Unknown segment type

    const segmentType = key as UidSegmentType;
    foundSegmentTypes.add(segmentType);

    // Map segment to property in result object
    const propertyName = segmentToPropertyMap[segmentType];
    result[propertyName] = value;
  }

  // If format is provided, validate that all required segments are present
  if (format) {
    for (const requiredSegment of format.requiredSegments) {
      if (!foundSegmentTypes.has(requiredSegment)) return null; // Missing required segment
    }
  }

  return result;
}

/**
 * Parse a team UID string
 *
 * @param uidString - The ESPN team UID string
 * @returns Object with parsed IDs or null if invalid
 *
 * @example parseTeamUid('s:6~l:1~t:5')
 * // { sportTypeId: '6', leagueId: '1', teamId: '5' }
 */
export function parseTeamUid(uidString: string): ParsedUid | null {
  return parseUid(uidString, UidFormats.TEAM);
}

/**
 * Parse an event UID string
 *
 * @param uidString - The ESPN event UID string
 * @returns Object with parsed IDs or null if invalid
 *
 * @example parseEventUid('s:6~l:1~e:4~c:5')
 * // { sportTypeId: '6', leagueId: '1', eventId: '4', competitionId: '5' }
 */
export function parseEventUid(uidString: string): ParsedUid | null {
  return parseUid(uidString, UidFormats.EVENT);
}

/**
 * Extract league ID from a UID string
 *
 * @param uidString - The ESPN UID string
 * @returns League ID or null if invalid/not found
 *
 * @example extractLeagueId('s:6~l:1~t:5')
 * // '1'
 */
export function extractLeagueId(uidString: string): string | null {
  const parsed = parseUid(uidString);
  return parsed?.leagueId ?? null;
}

/**
 * Generate a team UID from component parts
 *
 * @param sportType - Sport type ID
 * @param leagueId - League ID
 * @param teamId - Team ID
 * @returns Formatted UID string or empty string if any input is missing
 *
 * @example generateTeamUid('6', '1', '5')
 * // 's:6~l:1~t:5'
 */
export function generateTeamUid(
  sportType: SportTypeId | null,
  leagueId: IClientProLeagueType | null,
  teamId: string | number | null
): string {
  if (!sportType || !leagueId || !teamId) return '';
  return `${UidSegmentType.SPORT}:${sportType}~${UidSegmentType.LEAGUE}:${leagueId}~${UidSegmentType.TEAM}:${teamId}`;
}

/**
 * Generate an event UID from component parts
 *
 * @param sportType - Sport type ID
 * @param leagueId - League ID
 * @param eventId - Event ID
 * @param competitionId - Competition ID
 * @returns Formatted UID string or empty string if any input is missing
 *
 * @example generateEventUid('6', '1', '4', '5')
 * // 's:6~l:1~e:4~c:5'
 */
export function generateEventUid(
  sportType: SportTypeId | null,
  leagueId: IClientProLeagueType | null,
  eventId: string | number | null,
  competitionId: string | number | null
): string {
  if (!sportType || !leagueId || !eventId || !competitionId) return '';
  return `${UidSegmentType.SPORT}:${sportType}~${UidSegmentType.LEAGUE}:${leagueId}~${UidSegmentType.EVENT}:${eventId}~${UidSegmentType.COMPETITION}:${competitionId}`;
}

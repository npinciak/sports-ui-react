import { ESPN_PARAM_FRAGMENTS, ESPN_VIEW_PARAM_FRAGMENTS } from '../endpoint-builder/endpoint-builder.const';

/**
 * Builder class for generating ESPN API parameters.
 *
 * This class implements the Builder pattern for creating URL search parameters
 * used in ESPN API requests. It provides a fluent, chainable interface for
 * building parameter sets and includes factory methods for common parameter
 * combinations.
 *
 * @example
 * // Create league parameters
 * const leagueParams = EspnParamsBuilder.forLeague().build();
 *
 * // Create custom parameters
 * const customParams = new EspnParamsBuilder()
 *   .withView(ESPN_VIEW_PARAM_FRAGMENTS.Team)
 *   .withTeamId('123')
 *   .withScoringPeriod('2023')
 *   .build();
 *
 * // Customize preset configurations
 * const enhancedParams = EspnParamsBuilder.forPlayer('2023')
 *   .withParam('customParam', 'value')
 *   .build();
 */
export class EspnParamsBuilder {
  /** The internal URLSearchParams instance being constructed */
  private params: URLSearchParams = new URLSearchParams();

  /**
   * Adds a view parameter to the search params.
   * View parameters define which data sections should be included in the API response.
   *
   * @param view - The view parameter value to add
   * @returns The builder instance for method chaining
   *
   * @example
   * new EspnParamsBuilder().withView(ESPN_VIEW_PARAM_FRAGMENTS.Team);
   */
  withView(view: string): EspnParamsBuilder {
    this.params.append(ESPN_PARAM_FRAGMENTS.View, view);
    return this;
  }

  /**
   * Adds a scoring period parameter to the search params.
   * The scoring period determines which time period's data should be returned.
   *
   * @param scoringPeriodId - The scoring period ID
   * @returns The builder instance for method chaining
   *
   * @example
   * new EspnParamsBuilder().withScoringPeriod('20230401');
   */
  withScoringPeriod(scoringPeriodId: string): EspnParamsBuilder {
    this.params.append(ESPN_PARAM_FRAGMENTS.ScoringPeriod, scoringPeriodId);
    return this;
  }

  /**
   * Adds a team ID parameter to the search params.
   * This is used to filter data for a specific team.
   *
   * @param teamId - The team ID
   * @returns The builder instance for method chaining
   *
   * @example
   * new EspnParamsBuilder().withTeamId('3');
   */
  withTeamId(teamId: string): EspnParamsBuilder {
    this.params.append(ESPN_PARAM_FRAGMENTS.RosterForTeamId, teamId);
    return this;
  }

  /**
   * Adds a date range parameter to the search params.
   * This determines the date range for which data should be returned.
   *
   * @param dateRange - The date range string (format depends on the ESPN API endpoint)
   * @returns The builder instance for method chaining
   *
   * @example
   * new EspnParamsBuilder().withDateRange('20230401-20230430');
   */
  withDateRange(dateRange: string): EspnParamsBuilder {
    this.params.append(ESPN_PARAM_FRAGMENTS.Dates, dateRange);
    return this;
  }

  /**
   * Adds a use map parameter to the search params.
   * This parameter typically indicates if the response should include mapping data.
   *
   * @param value - The value for the use map parameter (default: 'true')
   * @returns The builder instance for method chaining
   *
   * @example
   * new EspnParamsBuilder().withUseMap();
   */
  withUseMap(value: string = 'true'): EspnParamsBuilder {
    this.params.append(ESPN_PARAM_FRAGMENTS.UseMap, value);
    return this;
  }

  /**
   * Adds a play-by-play only parameter to the search params.
   * This typically limits the response to only include play-by-play data.
   *
   * @param value - The value for the PBP only parameter (default: 'true')
   * @returns The builder instance for method chaining
   *
   * @example
   * new EspnParamsBuilder().withPbpOnly();
   */
  withPbpOnly(value: string = 'true'): EspnParamsBuilder {
    this.params.append(ESPN_PARAM_FRAGMENTS.PbpOnly, value);
    return this;
  }

  /**
   * Adds a player ID parameter to the search params.
   * This is used to filter data for a specific player.
   *
   * @param playerId - The player ID
   * @returns The builder instance for method chaining
   *
   * @example
   * new EspnParamsBuilder().withPlayerId('12345');
   */
  withPlayerId(playerId: string): EspnParamsBuilder {
    this.params.append(ESPN_PARAM_FRAGMENTS.PlayerId, playerId);
    return this;
  }

  /**
   * Adds a batter ID parameter to the search params.
   * This is used in baseball endpoints to filter data for a specific batter.
   *
   * @param batterId - The batter ID
   * @returns The builder instance for method chaining
   *
   * @example
   * new EspnParamsBuilder().withBatterId('12345');
   */
  withBatterId(batterId: string): EspnParamsBuilder {
    this.params.append(ESPN_PARAM_FRAGMENTS.BatterId, batterId);
    return this;
  }

  /**
   * Adds a custom parameter to the search params.
   * This allows adding any parameter that isn't covered by the specific methods.
   *
   * @param key - The parameter key
   * @param value - The parameter value
   * @returns The builder instance for method chaining
   *
   * @example
   * new EspnParamsBuilder().withParam('customKey', 'customValue');
   */
  withParam(key: string, value: string): EspnParamsBuilder {
    this.params.append(key, value);
    return this;
  }

  /**
   * Builds and returns the final URLSearchParams object.
   * This method should be called after all parameters have been added.
   *
   * @returns The constructed URLSearchParams object
   *
   * @example
   * const params = new EspnParamsBuilder().withView('team').build();
   */
  build(): URLSearchParams {
    return this.params;
  }

  /**
   * Creates a builder pre-configured with league parameters.
   * Includes settings, live scoring, scoreboard, status, team, and transactions views.
   *
   * @returns A new builder instance with league parameters
   *
   * @example
   * const leagueParams = EspnParamsBuilder.forLeague().build();
   */
  static forLeague(): EspnParamsBuilder {
    return new EspnParamsBuilder()
      .withView(ESPN_VIEW_PARAM_FRAGMENTS.Settings)
      .withView(ESPN_VIEW_PARAM_FRAGMENTS.LiveScoring)
      .withView(ESPN_VIEW_PARAM_FRAGMENTS.Scoreboard)
      .withView(ESPN_VIEW_PARAM_FRAGMENTS.Status)
      .withView(ESPN_VIEW_PARAM_FRAGMENTS.Team)
      .withView(ESPN_VIEW_PARAM_FRAGMENTS.Transactions);
  }

  /**
   * Creates a builder pre-configured with player parameters.
   * Includes scoring period and players view.
   *
   * @param scoringPeriodId - The scoring period ID
   * @returns A new builder instance with player parameters
   *
   * @example
   * const playerParams = EspnParamsBuilder.forPlayer('20230401').build();
   */
  static forPlayer(scoringPeriodId: string): EspnParamsBuilder {
    return new EspnParamsBuilder().withScoringPeriod(scoringPeriodId).withView(ESPN_VIEW_PARAM_FRAGMENTS.PlayersWl);
  }

  /**
   * Creates a builder pre-configured with team parameters.
   * Includes team ID and various team-related views.
   *
   * @param teamId - The team ID
   * @returns A new builder instance with team parameters
   *
   * @example
   * const teamParams = EspnParamsBuilder.forTeam('3').build();
   */
  static forTeam(teamId: string): EspnParamsBuilder {
    return new EspnParamsBuilder()
      .withTeamId(teamId)
      .withView(ESPN_VIEW_PARAM_FRAGMENTS.Team)
      .withView(ESPN_VIEW_PARAM_FRAGMENTS.Roster)
      .withView(ESPN_VIEW_PARAM_FRAGMENTS.PendingTransactions)
      .withView(ESPN_VIEW_PARAM_FRAGMENTS.PositionalRatings);
  }

  /**
   * Creates a builder pre-configured with event parameters.
   * Includes use map, date range, and play-by-play only parameters.
   *
   * @param dateRange - The date range
   * @returns A new builder instance with event parameters
   *
   * @example
   * const eventParams = EspnParamsBuilder.forEvent('20230401-20230430').build();
   */
  static forEvent(dateRange: string): EspnParamsBuilder {
    return new EspnParamsBuilder().withUseMap().withDateRange(dateRange).withPbpOnly();
  }

  /**
   * Creates a builder pre-configured with pro team schedule parameters.
   * Includes the pro team schedules view.
   *
   * @returns A new builder instance with pro team schedule parameters
   *
   * @example
   * const scheduleParams = EspnParamsBuilder.forProTeamSchedule().build();
   */
  static forProTeamSchedule(): EspnParamsBuilder {
    return new EspnParamsBuilder().withView(ESPN_VIEW_PARAM_FRAGMENTS.ProTeamSchedules);
  }
}

/**
 * @deprecated Use EspnParamsBuilder instead
 * Class that handles ESPN API parameter generation
 */
export class EspnParamsHandler {
  /**
   * @deprecated Use EspnParamsBuilder.forLeague().build() instead
   * Generates league params
   * @returns URLSearchParams
   */
  static generateLeagueParams(): URLSearchParams {
    return EspnParamsBuilder.forLeague().build();
  }

  /**
   * @deprecated Use EspnParamsBuilder.forPlayer(scoringPeriodId).build() instead
   * Generates player query params
   * @param scoringPeriodId - The scoring period ID
   * @returns URLSearchParams
   */
  static generatePlayerParams(scoringPeriodId: string): URLSearchParams {
    return EspnParamsBuilder.forPlayer(scoringPeriodId).build();
  }

  /**
   * @deprecated Use EspnParamsBuilder.forTeam(teamId).build() instead
   * Generates team params
   * @param teamId - The team ID
   * @returns URLSearchParams
   */
  static generateTeamParams(teamId: string): URLSearchParams {
    return EspnParamsBuilder.forTeam(teamId).build();
  }

  /**
   * @deprecated Use EspnParamsBuilder.forEvent(dateRange).build() instead
   * Generates event params
   * @param dateRange - The date range for events
   * @returns URLSearchParams
   */
  static generateEventParams(dateRange: string): URLSearchParams {
    return EspnParamsBuilder.forEvent(dateRange).build();
  }

  /**
   * @deprecated Use EspnParamsBuilder.forProTeamSchedule().build() instead
   * Generates pro team schedule params
   * @returns URLSearchParams
   */
  static generateProTeamScheduleParams(): URLSearchParams {
    return EspnParamsBuilder.forProTeamSchedule().build();
  }
}

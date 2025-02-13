export class ApiEndpointConfiguration {
  static get baseEspnUrl(): string {
    const endpoint = import.meta.env.VITE_ESPN_BASE as string | undefined;

    if (endpoint == undefined) throw new Error('VITE_ESPN_BASE is not defined in .env file');

    return endpoint;
  }

  static get baseEspnEndpointV2() {
    return `${ApiEndpointConfiguration.baseEspnUrl}/v2`;
  }

  static get espnFantasyEndpointV2() {
    return `${ApiEndpointConfiguration.baseEspnUrl}/fantasy/v2`;
  }

  static get espnFantasyEndpointV3() {
    const endpoint = import.meta.env.VITE_ESPN_FANTASY_BASE_V3 as string | undefined;

    if (endpoint == undefined) throw new Error('VITE_ESPN_FANTASY_BASE_V3 is not defined in .env file');

    return endpoint;
  }
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EspnClient } from 'sports-ui-sdk';
import { SmartDate } from '../../../@shared/helpers';
import { ApiEndpointConfiguration } from '../../../api.config';
import { generateEventParams } from '../espn-helpers';
import { FantasySportsAbbreviation } from '../helpers/endpoint-builder/endpoint-builder.model';

export const EspnFantasyClientV2 = createApi({
  reducerPath: 'espnFantasyClientV2',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiEndpointConfiguration.espnFantasyEndpointV2,
  }),
  endpoints: builder => ({
    getPlayerNews: builder.query<
      unknown,
      {
        fantasySport: FantasySportsAbbreviation;
        lookbackPeriod: number;
        playerId: string | null;
      }
    >({
      query: args => {
        const { fantasySport, lookbackPeriod, playerId } = args;

        const params = {
          days: lookbackPeriod,
          playerId,
        };

        return {
          url: `/games/${fantasySport}/news/players`,
          params,
        };
      },
    }),
    getEvents: builder.query<EspnClient.EventList, { fantasySport: FantasySportsAbbreviation }>({
      query: args => {
        const { fantasySport } = args;

        const smartDate = new SmartDate();

        const oneWeekAgoFromToday = smartDate.formatWithDelimiter({ date: smartDate.today.getTime() });
        const oneWeekFromToday = smartDate.formatWithDelimiter({ date: smartDate.today.getTime() });

        const dateRange = `${oneWeekAgoFromToday}-${oneWeekFromToday}`;

        const params = generateEventParams(dateRange);

        return {
          url: `/games/${fantasySport}/games`,
          params,
        };
      },
    }),
  }),
});

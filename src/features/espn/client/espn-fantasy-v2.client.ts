import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EspnClient } from 'sports-ui-sdk';
import { SmartDate } from '../../../@shared/helpers';
import { ApiEndpointConfiguration } from '../../../api.config';
import { generateEventParams } from '../espn-helpers';

export const EspnFantasyClientV2 = createApi({
  reducerPath: 'espnFantasyClientV2',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiEndpointConfiguration.espnFantasyEndpointV2,
  }),
  endpoints: builder => ({
    getEvents: builder.query<EspnClient.EventList, void>({
      query: () => {
        const smartDate = new SmartDate();

        const oneWeekAgoFromToday = smartDate.formatWithDelimiter({ date: smartDate.today.getTime() });
        const oneWeekFromToday = smartDate.formatWithDelimiter({ date: smartDate.today.getTime() });

        const dateRange = `${oneWeekAgoFromToday}-${oneWeekFromToday}`;

        const params = generateEventParams(dateRange);

        return {
          url: '/games',
          params,
        };
      },
    }),
  }),
});

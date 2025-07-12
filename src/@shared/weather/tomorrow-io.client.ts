import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpointConfiguration } from 'src/api.config';

export const TomorrowIoClient = createApi({
  reducerPath: 'tomorrowIoClient',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.tomorrow.io/v4/weather',
  }),
  endpoints: builder => ({
    getForecast: builder.query<any, void>({
      query: () => {
        return {
          url: `/forecast?location=42.346613,-71.098817`,
          headers: {
            apikey: ApiEndpointConfiguration.tomorrowIoKey,
          },
        };
      },
    }),
  }),
});

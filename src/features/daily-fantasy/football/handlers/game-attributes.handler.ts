import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SmartDate } from '@shared/helpers';
import { DfsEndpointBuilder } from '../../helpers';
import { GameAttributes } from '../../models/game-attributes.model';

const endpoints = DfsEndpointBuilder();

export const footballGameAttributesHandler = createApi({
  reducerPath: 'footballGameAttributesHandler',
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.schedules,
  }),
  endpoints: builder => ({
    fetchGameAttributes: builder.query<GameAttributes, { site: string; slateId: string }>({
      query: args => {
        const { site, slateId } = args;

        const date = new SmartDate().formatWithDelimiter({ date: new Date().getTime(), delimiter: '-' });

        return {
          url: `/nfl/game-attributes`,
          params: {
            site,
            date,
            slate_id: slateId,
          },
        };
      },
    }),
  }),
});

export const { useFetchGameAttributesQuery, useLazyFetchGameAttributesQuery } = footballGameAttributesHandler;

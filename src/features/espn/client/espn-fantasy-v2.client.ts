import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IClientEventEntity } from '@sdk/espn-client-models/event.model';
import { IClientPlayerNewsFeed } from '@sdk/espn-client-models/player-news-feed.model';
import { SmartDate } from '@shared//helpers';
import { ApiEndpointConfiguration } from '../../../api.config';
import { generateEventParams } from '../espn-helpers';
import { FantasySportsAbbreviation } from '../helpers/endpoint-builder/endpoint-builder.model';
import { FantasyPlayerNewsEntity } from '../models/fantasy-player-news-entity.model';
import { transformClientPlayerNewsFeed } from '../transformers/fantasy-player.transformers';

interface IClientPlayerNewsParams {
  fantasySport: FantasySportsAbbreviation;
  lookbackPeriod: number;
  playerId: string | null;
}

interface IClientGetEventsParams {
  fantasySport: FantasySportsAbbreviation;
}

export const EspnFantasyClientV2 = createApi({
  reducerPath: 'espnFantasyClientV2',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiEndpointConfiguration.espnFantasyEndpointV2,
  }),
  endpoints: builder => ({
    getPlayerNews: builder.query<FantasyPlayerNewsEntity[], IClientPlayerNewsParams>({
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
      transformResponse: ({ feed }: IClientPlayerNewsFeed) => feed.map(value => transformClientPlayerNewsFeed(value)),
    }),
    getEvents: builder.query<IClientEventEntity[], IClientGetEventsParams>({
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

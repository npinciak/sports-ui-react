import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IClientEventEntity } from '@sdk/espn-client-models/event.model';
import { IClientPlayerNewsFeed } from '@sdk/espn-client-models/player-news-feed.model';
import { SmartDate } from '@shared//helpers';
import { getTime } from 'date-fns/getTime';
import { ApiEndpointConfiguration } from '../../../api.config';
import { BaseballEvent } from '../fantasy-baseball/models/baseball-event.model';
import { FantasySportsAbbreviation } from '../helpers/endpoint-builder/endpoint-builder.model';
import { EspnParamsBuilder } from '../helpers/params-handler/params-handler';
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
    getEvents: builder.query<{ events: BaseballEvent[] }, IClientGetEventsParams>({
      query: args => {
        const { fantasySport } = args;

        const smartDate = new SmartDate();

        const oneWeekAgoFromToday = smartDate.formatWithDelimiter({ date: smartDate.today.getTime() });
        const oneWeekFromToday = smartDate.formatWithDelimiter({ date: smartDate.today.getTime() });

        const dateRange = `${oneWeekAgoFromToday}-${oneWeekFromToday}`;

        const params = EspnParamsBuilder.forEvent(dateRange).build();

        return {
          url: `/games/${fantasySport}/games`,
          params,
        };
      },
      transformResponse: ({ events }: { events: IClientEventEntity[] }) => {
        const newE = events.map(event => {
          const test = event.competitors.reduce(
            (obj, val) => {
              const { homeAway } = val;
              obj[homeAway] = val;
              return obj;
            },
            {} as Record<string, any>
          );

          return {
            id: event.id,
            uid: event.uid,
            competitors: test,
            timestamp: getTime(new Date(event.date)),
          };
        });
        return {
          events: newE,
        };
      },
    }),
  }),
});

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpointConfiguration } from '../../../api.config';
import { UIFastcast } from '../fastcast/models/fastcast-transform.model';
import { transformFastcastCheckpointToUIFastcast } from '../fastcast/transformers/espn-fastcast.transformers';

export const EspnClientV2 = createApi({
  reducerPath: 'espnClientV2',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiEndpointConfiguration.baseEspnEndpointV2,
  }),
  endpoints: builder => ({
    getStaticScoreboard: builder.query<UIFastcast, void>({
      query: () => {
        return {
          url: `/scoreboard/header`,
        };
      },
      transformResponse: (response: any) => {
        return transformFastcastCheckpointToUIFastcast(response);
      },
    }),
  }),
});

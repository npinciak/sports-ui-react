import { createBrowserRouter } from 'react-router-dom';

import { AppStore } from './app.store';
import { BaseballHome, BaseballTeam } from './features/espn/fantasy-baseball';
import { baseballClient } from './features/espn/fantasy-baseball/client/fantasy-baseball.client';

// export function AppRouting() {
//   // const { data, error, isLoading } =
//   // fantasyFootballLeagueApi.endpoints.getLeagueById.useQuery({
//   //   year: '2023',
//   //   leagueId: '1791690188',
//   // });
//   return (
//     <Routes>
//       <Route path="/account/:accountId" element={<FantasyBaseballHome />} />
//     </Routes>
//   );
// }

export const AppRouter = createBrowserRouter([
  {
    path: '',
    children: [
      {
        path: ':year',
        children: [
          {
            path: 'league',
            children: [
              {
                path: ':leagueId',
                loader: async ({ params }) => {
                  await AppStore.dispatch(
                    baseballClient.endpoints.fetchLeague.initiate({
                      year: params?.year ?? '',
                      leagueId: params?.leagueId ?? '',
                    })
                  );

                  return null;
                },

                children: [
                  {
                    path: '',
                    element: <BaseballHome />,
                  },
                  {
                    path: 'team',
                    children: [
                      {
                        path: ':teamId',
                        element: <BaseballTeam />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
//
// {
//     path: UrlPathFragments.Empty,
//     data: { sport: UrlPathFragments.Football },
//     children: [
//       {
//         path: UrlPathParams.Year,
//         children: [
//           {
//             path: UrlPathFragments.League,
//             children: [
//               {
//                 path: UrlPathParams.LeagueId,
//                 resolve: [FantasyFootballLeagueResolver],
//                 children: [
//                   {
//                     path: UrlPathFragments.Empty,
//                     component: FootballHomeComponent,
//                   },
//                   {
//                     path: UrlPathFragments.Team,
//                     children: [
//                       {
//                         path: UrlPathParams.TeamId,
//                         children: [
//                           {
//                             path: UrlPathFragments.Empty,
//                             component: FootballTeamComponent,
//                           },
//                         ],
//                       },
//                     ],
//                   },
//                   {
//                     path: UrlPathFragments.FreeAgents,
//                     resolve: [FantasyFootballFreeAgentsResolver],
//                     children: [
//                       {
//                         path: UrlPathFragments.Empty,
//                         component: FootballFreeAgentsComponent,
//                       },
//                     ],
//                   },
//                   {
//                     path: UrlPathFragments.Player,
//                     children: [
//                       {
//                         path: UrlPathParams.PlayerId,
//                         resolve: [FantasyFootballPlayerNewsResolver],
//                         children: [
//                           {
//                             path: UrlPathFragments.Empty,
//                             component: FootballPlayerComponent,
//                           },
//                         ],
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },

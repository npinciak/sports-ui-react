import { fangraphsClient } from '../../@shared';
import { AppStore } from '../../app.store';
import {
  AdminLeagueProgressionPage,
  BaseballBatters,
  BaseballFreeAgents,
  BaseballHome,
  BaseballPitchers,
  BaseballPlayer,
  BaseballTeam,
} from '../../features';
import { baseballClient } from '../../features/espn/fantasy-baseball/client';
import { ProfilePage } from '../../features/profile';
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  LogoutPage,
  ResetPasswordPage,
  SignUpPage,
} from '../pages';
import { ProtectedRoute } from './protected-route.component';

export const authenticatedRoutes = [
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'logout',
        element: <LogoutPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'admin',
        children: [
          {
            path: 'league-progression',
            element: <AdminLeagueProgressionPage />,
          },
        ],
      },
      {
        path: 'baseball',
        children: [
          {
            path: ':year',
            children: [
              {
                path: 'league',
                children: [
                  {
                    path: ':leagueId',
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
                            children: [
                              {
                                path: '',
                                element: <BaseballTeam />,
                                loader: async ({
                                  params,
                                }: {
                                  params: {
                                    year: string;
                                    leagueId: string;
                                    teamId: string;
                                  };
                                }) => {
                                  await AppStore.dispatch(
                                    baseballClient.endpoints.fetchTeamById.initiate(
                                      {
                                        year: params?.year ?? '',
                                        leagueId: params?.leagueId ?? '',
                                        teamId: params?.teamId ?? '',
                                      }
                                    )
                                  );
                                  await AppStore.dispatch(
                                    fangraphsClient.endpoints.getFangraphPlayerList.initiate()
                                  );
                                  return null;
                                },
                              },
                              {
                                path: 'batters',
                                children: [
                                  {
                                    path: '',
                                    element: <BaseballBatters />,
                                  },
                                ],
                              },
                              {
                                path: 'pitchers',
                                children: [
                                  {
                                    path: '',
                                    element: <BaseballPitchers />,
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: 'free-agents',
                        children: [
                          {
                            path: '',
                            element: <BaseballFreeAgents />,
                          },
                        ],
                      },
                      {
                        path: 'player',
                        children: [
                          {
                            path: ':playerId',
                            children: [
                              {
                                path: '',
                                element: <BaseballPlayer />,
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
        ],
      },
    ],
  },
];

export const publicRoutes = [
  {
    path: '',
    element: <HomePage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },

  {
    path: 'forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: 'reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: 'sign-up',
    element: <SignUpPage />,
  },
  { path: '*', element: <HomePage /> },
];

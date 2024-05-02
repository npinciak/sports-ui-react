import { createBrowserRouter } from 'react-router-dom';

import { AppStore } from './app.store';
import {
  ForgotPasswordPage,
  Home,
  LoginPage,
  ResetPasswordPage,
  SignUpPage,
} from './core';
import { AdminLeagueProgressionPage } from './features';
import {
  BaseballBatters,
  BaseballFreeAgents,
  BaseballHome,
  BaseballPitchers,
  BaseballPlayer,
  BaseballTeam,
} from './features/espn/fantasy-baseball';
import { baseballClient } from './features/espn/fantasy-baseball/client/fantasy-baseball.client';
import { ProfilePage } from './features/profile';

export const AppRouter = createBrowserRouter([
  {
    path: '',
    children: [
      {
        path: '',
        element: <Home />,
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
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <ProfilePage />,
          },
        ],
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
                    loader: async ({ params }) => {
                      await AppStore.dispatch(
                        baseballClient.endpoints.fetchLeagueById.initiate({
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
                            children: [
                              {
                                path: '',
                                element: <BaseballTeam />,
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
  { path: '*', element: <div>404</div> },
]);

import { LoaderFunctionArgs, RouteObject } from 'react-router';
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
import { FootballHomePage } from '../../features/daily-fantasy/football/pages/football-home.page';
import { DailyFantasyHomePage } from '../../features/daily-fantasy/pages/home.page';
import { EspnFantasyClientV2 } from '../../features/espn/client/espn-fantasy-v2.client';
import { EspnFantasyClientV3 } from '../../features/espn/client/espn-fantasy-v3.client';
import { FastcastScoreboardHomePage } from '../../features/espn/fastcast/pages/home.page';
import { ProfilePage } from '../../features/profile';
import ShellComponent from '../../shell/shell.component';
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  LogoutPage,
  ResetPasswordPage,
  SignUpPage,
} from '../pages';
import { ROUTE_FRAGMENT } from './routes.model';

export const publicRoutes: RouteObject[] = [
  {
    path: ROUTE_FRAGMENT.EMPTY,
    element: <ShellComponent />,
    children: [
      {
        path: ROUTE_FRAGMENT.EMPTY,
        element: <HomePage />,
      },
      {
        path: ROUTE_FRAGMENT.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTE_FRAGMENT.DAILY_FANTASY,
        children: [
          {
            path: ROUTE_FRAGMENT.EMPTY,
            element: <DailyFantasyHomePage />,
          },
          {
            path: ROUTE_FRAGMENT.FOOTBALL,
            element: <FootballHomePage />,
          },
        ],
      },
      {
        path: ROUTE_FRAGMENT.SCOREBOARD,
        children: [
          {
            path: ROUTE_FRAGMENT.EMPTY,
            element: <FastcastScoreboardHomePage />,
          },
        ],
      },

      {
        path: ROUTE_FRAGMENT.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: ROUTE_FRAGMENT.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
      {
        path: ROUTE_FRAGMENT.SIGN_UP,
        element: <SignUpPage />,
      },
      {
        path: ROUTE_FRAGMENT.LOGOUT,
        element: <LogoutPage />,
      },
      {
        path: ROUTE_FRAGMENT.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTE_FRAGMENT.ADMIN,
        children: [
          {
            path: ROUTE_FRAGMENT.LEAGUE_PROGRESSION,
            element: <AdminLeagueProgressionPage />,
          },
        ],
      },
      {
        path: ROUTE_FRAGMENT.BASEBALL,
        children: [
          {
            path: ROUTE_FRAGMENT.YEAR,
            children: [
              {
                path: ROUTE_FRAGMENT.LEAGUE,
                loader: async () => {
                  await AppStore.dispatch(
                    EspnFantasyClientV2.endpoints.getEvents.initiate()
                  );

                  return null;
                },
                children: [
                  {
                    path: ROUTE_FRAGMENT.LEAGUE_ID,
                    children: [
                      {
                        path: ROUTE_FRAGMENT.EMPTY,
                        element: <BaseballHome />,
                      },
                      {
                        path: ROUTE_FRAGMENT.TEAM,
                        children: [
                          {
                            path: ROUTE_FRAGMENT.TEAM_ID,
                            children: [
                              {
                                path: ROUTE_FRAGMENT.EMPTY,
                                element: <BaseballTeam />,

                                loader: async ({
                                  params,
                                }: LoaderFunctionArgs) => {
                                  await AppStore.dispatch(
                                    EspnFantasyClientV3.endpoints.getBaseballTeamById.initiate(
                                      {
                                        year:
                                          params?.year ?? ROUTE_FRAGMENT.EMPTY,
                                        leagueId:
                                          params?.leagueId ??
                                          ROUTE_FRAGMENT.EMPTY,
                                        teamId:
                                          params?.teamId ??
                                          ROUTE_FRAGMENT.EMPTY,
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
                                path: ROUTE_FRAGMENT.BATTERS,
                                children: [
                                  {
                                    path: ROUTE_FRAGMENT.EMPTY,
                                    element: <BaseballBatters />,
                                  },
                                ],
                              },
                              {
                                path: ROUTE_FRAGMENT.PITCHERS,
                                children: [
                                  {
                                    path: ROUTE_FRAGMENT.EMPTY,
                                    element: <BaseballPitchers />,
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: ROUTE_FRAGMENT.FREE_AGENTS,
                        children: [
                          {
                            path: ROUTE_FRAGMENT.EMPTY,
                            element: <BaseballFreeAgents />,
                          },
                        ],
                      },
                      {
                        path: ROUTE_FRAGMENT.PLAYER,
                        children: [
                          {
                            path: ROUTE_FRAGMENT.PLAYER_ID,
                            children: [
                              {
                                path: ROUTE_FRAGMENT.EMPTY,
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
      {
        path: ROUTE_FRAGMENT.FOOTBALL,
        children: [
          {
            path: ROUTE_FRAGMENT.YEAR,
            children: [
              {
                path: ROUTE_FRAGMENT.LEAGUE,
                loader: async () => {
                  //TODO: Implement
                  return null;
                },
                children: [
                  {
                    path: ROUTE_FRAGMENT.LEAGUE_ID,
                    children: [
                      {
                        path: ROUTE_FRAGMENT.EMPTY,
                        element: <div>Football Home</div>,
                      },
                      {
                        path: ROUTE_FRAGMENT.TEAM,
                        children: [
                          {
                            path: ROUTE_FRAGMENT.TEAM_ID,
                            children: [
                              {
                                path: ROUTE_FRAGMENT.EMPTY,
                                element: <div>Football Team</div>,
                                loader: async () => {
                                  //TODO: Implement
                                  return null;
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        path: ROUTE_FRAGMENT.FREE_AGENTS,
                        children: [
                          {
                            path: ROUTE_FRAGMENT.EMPTY,
                            element: <div>Football Free Agents</div>,
                          },
                        ],
                      },
                      {
                        path: ROUTE_FRAGMENT.PLAYER,
                        children: [
                          {
                            path: ROUTE_FRAGMENT.PLAYER_ID,
                            children: [
                              {
                                path: ROUTE_FRAGMENT.EMPTY,
                                element: <div>Football Player</div>,
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
      { path: '*', element: <HomePage /> },
    ],
  },
];

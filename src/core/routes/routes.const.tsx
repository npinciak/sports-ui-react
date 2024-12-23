import { Home, Login } from '@mui/icons-material';
import { AdminLeagueProgressionPage } from '../../features';
import { ProfilePage } from '../../features/profile';
import { AuthenticationService } from '../authentication/authentication.service';
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  LogoutPage,
  SignUpPage,
} from '../pages';
import { ApplicationRoute } from './routes.model';

export const HomeRoute: ApplicationRoute = {
  path: '',
  navigationLabel: 'Home',
  icon: <Home />,
  component: <HomePage />,
};

export const LoginRoute: ApplicationRoute = {
  path: 'login',
  navigationLabel: 'Login',
  icon: <Login />,
  component: <LoginPage />,
};

export const ForgotPasswordRoute: ApplicationRoute = {
  path: 'forgot-password',
  navigationLabel: 'Forgot Password',
  icon: <Login />,
  component: <ForgotPasswordPage />,
};

export const ResetPasswordRoute: ApplicationRoute = {
  path: 'reset-password',
  navigationLabel: 'Reset Password',
  icon: <Login />,
  component: <ForgotPasswordPage />,
};

export const SignUpRoute: ApplicationRoute = {
  path: 'sign-up',
  navigationLabel: 'Sign Up',
  icon: <Login />,
  component: <SignUpPage />,
};

export const ProfileRoute: ApplicationRoute = {
  path: 'profile',
  navigationLabel: 'Profile',
  icon: <Login />,
  component: <ProfilePage />,
};

export const LeagueProgressionRoute: ApplicationRoute = {
  path: 'admin/league-progression',
  navigationLabel: 'League Progression',
  icon: <Login />,
  component: <AdminLeagueProgressionPage />,
};

export const DailyFantasyNflRoute: ApplicationRoute = {
  path: 'daily-fantasy/nfl',
  navigationLabel: 'NFL Dfs',
  icon: <></>,
  component: <></>,
};

export const LogoutRoute: ApplicationRoute = {
  path: 'logout',
  navigationLabel: 'Logout',
  icon: <Login />,
  component: <LogoutPage />,
};

export const ProfileNavigationRoutes = [ProfileRoute, LogoutRoute];

export const AuthenticatedNavigationRoutes = [
  HomeRoute,
  DailyFantasyNflRoute,
  LeagueProgressionRoute,
];

export const UnauthenticatedNavigationRoutes = [
  LoginRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  SignUpRoute,
];

export const ProfileNavigationLinks = [
  ...(!AuthenticationService.hasValidAuthToken ? [] : ProfileNavigationRoutes),
];

export const NavigationLinks = [
  ...(!AuthenticationService.hasValidAuthToken
    ? UnauthenticatedNavigationRoutes
    : AuthenticatedNavigationRoutes),
];

import {
  AdminPanelSettings,
  Home,
  Login,
  PersonPin,
  Scoreboard,
  Sports,
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthenticationService } from 'src/core/authentication';
import { ROUTE_FRAGMENT } from '../core/routes/routes.model';

export function ShellBottomNavigationComponent() {
  const navigate = useNavigate();

  const isLoggedIn = AuthenticationService.hasValidAuthToken;

  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        onClick={() => navigate(ROUTE_FRAGMENT.HOME)}
      />

      <BottomNavigationAction
        label="DFS"
        icon={<Sports />}
        onClick={() => navigate(ROUTE_FRAGMENT.DAILY_FANTASY)}
      />

      <BottomNavigationAction
        label="Scoreboard"
        icon={<Scoreboard />}
        onClick={() => navigate(ROUTE_FRAGMENT.SCOREBOARD)}
      />
      {isLoggedIn && (
        <>
          <BottomNavigationAction
            label="Admin"
            icon={<AdminPanelSettings />}
            onClick={() =>
              navigate(
                `${ROUTE_FRAGMENT.ADMIN}/${ROUTE_FRAGMENT.LEAGUE_PROGRESSION}`
              )
            }
          />

          <BottomNavigationAction
            label="Profile"
            icon={<PersonPin />}
            onClick={() => navigate(ROUTE_FRAGMENT.PROFILE)}
          />
        </>
      )}
      {!isLoggedIn && (
        <BottomNavigationAction
          label="Login"
          icon={<Login />}
          onClick={() => navigate(ROUTE_FRAGMENT.LOGIN)}
        />
      )}
    </BottomNavigation>
  );
}

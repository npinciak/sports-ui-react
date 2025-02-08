import { Home, PersonPin, Scoreboard, Sports } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTE_FRAGMENT } from '../core/routes/routes.model';

export function ShellBottomNavigationComponent() {
  const navigate = useNavigate();

  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        onClick={() => navigate(ROUTE_FRAGMENT.HOME)}
      />

      <BottomNavigationAction
        label="Daily Fantasy"
        icon={<Sports />}
        onClick={() => navigate(ROUTE_FRAGMENT.DAILY_FANTASY)}
      />

      <BottomNavigationAction
        label="Scoreboard"
        icon={<Scoreboard />}
        onClick={() => navigate(ROUTE_FRAGMENT.SCOREBOARD)}
      />

      <BottomNavigationAction
        label="Profile"
        icon={<PersonPin />}
        onClick={() => navigate(ROUTE_FRAGMENT.PROFILE)}
      />
    </BottomNavigation>
  );
}

import { Home, PersonPin, Scoreboard, Sports } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ShellBottomNavigationComponent() {
  const navigate = useNavigate();

  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="Home"
        icon={<Home />}
        onClick={() => navigate('')}
      />

      <BottomNavigationAction
        label="Daily Fantasy"
        icon={<Sports />}
        onClick={() => navigate('daily-fantasy')}
      />

      <BottomNavigationAction
        label="Scoreboard"
        icon={<Scoreboard />}
        onClick={() => navigate('')}
      />

      <BottomNavigationAction
        label="Profile"
        icon={<PersonPin />}
        onClick={() => navigate('/profile')}
      />
    </BottomNavigation>
  );
}

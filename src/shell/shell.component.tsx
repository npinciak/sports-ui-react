import { Home, PersonPin, Scoreboard, Sports } from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { Outlet, useNavigate } from 'react-router-dom';
import '../App.css';
import { HeaderComponent } from '../core';

function ShellComponent() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderComponent />
      <Box sx={{ pb: 7 }}>
        <Container>
          <Outlet />
        </Container>
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="Home"
              icon={<Home />}
              onClick={() => navigate('')}
            />

            <BottomNavigationAction
              label="Daily Fantasy"
              icon={<Sports />}
              onClick={() => navigate('')}
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
        </Paper>
      </Box>
    </>
  );
}

export default ShellComponent;

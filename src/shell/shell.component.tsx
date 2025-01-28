import { Box, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Outlet } from 'react-router-dom';
import '../App.css';
import { HeaderComponent } from '../core';
import { ShellBottomNavigationComponent } from './shell-bottom-navigation.component';

function ShellComponent() {
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
          <ShellBottomNavigationComponent />
        </Paper>
      </Box>
    </>
  );
}

export default ShellComponent;

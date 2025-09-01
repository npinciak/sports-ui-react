import { Box, Container, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import '../App.css';
import { HeaderComponent } from '../core';
import { ShellBottomNavigationComponent } from './shell-bottom-navigation.component';

function ShellComponent() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <HeaderComponent />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pb: 7, // Always add padding for the bottom navigation
          pt: 2,
          animation: 'fadeIn 0.5s ease-in-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Outlet />
        </Container>
      </Box>
      {/* <Paper
        sx={{
          padding: '20px 0',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.palette.background.default,
        }}
      > */}
      <ShellBottomNavigationComponent />
      {/* </Paper> */}
    </Box>
  );
}

export default ShellComponent;

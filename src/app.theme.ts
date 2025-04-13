import { createTheme } from '@mui/material/styles';

export const COLOR = {
  CHARCOAL_BLACK: '#121212',
  DEEP_GRAPHITE: '#1F1F1F',
  SILVER: '#E0E0E0',
  MEDIUM_GRAY: '#B0B0B0',
  DIM_GRAY: '#2E2E2E',
  MODERN_BLUE: '#3F88C5',
  DYNAMIC_GREEN: '#4CAF50',
  STRIKE_RED: '#E53935',
} as const;

export const AppTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#3F88C5',
          color: '#E0E0E0',
        },
      },
    },
  },
  typography: {},
  palette: {
    mode: 'dark',
    primary: {
      light: '#757ce8',
      main: '#3F88C5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    background: {
      default: COLOR.CHARCOAL_BLACK,
      paper: '#1F1F1F',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
    },
    action: {
      active: '#E0E0E0',
      hover: '#424242',
      disabledBackground: '#424242',
      selected: '#424242',
    },
  },
});

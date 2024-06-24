import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppStore } from './app.store.ts';
import { AppTheme } from './app.theme';
import { ApplicationRoutes } from './core/index.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={AppTheme}>
      <Provider store={AppStore}>
        <ApplicationRoutes />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

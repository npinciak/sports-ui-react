import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './app.routing.tsx';
import { AppStore } from './app.store.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={AppStore}>
      <RouterProvider router={AppRouter} />
    </Provider>
  </React.StrictMode>
);

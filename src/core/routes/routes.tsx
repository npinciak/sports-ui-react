import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './router';

export function ApplicationRoutes() {
  const AppRouter = createBrowserRouter(publicRoutes);

  return <RouterProvider router={AppRouter} />;
}

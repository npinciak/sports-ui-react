import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { authenticatedRoutes, publicRoutes } from './router';

export function ApplicationRoutes() {
  const AppRouter = createBrowserRouter([
    ...authenticatedRoutes,
    ...publicRoutes,
  ]);

  return <RouterProvider router={AppRouter} />;
}

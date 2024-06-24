import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthenticationService } from '../authentication/authentication.service';
import { authenticatedRoutes, publicRoutes } from './router';

export function ApplicationRoutes() {
  const AppRouter = createBrowserRouter([
    ...(!AuthenticationService.hasValidAuthToken ? [] : authenticatedRoutes),
    ...publicRoutes,
  ]);

  return <RouterProvider router={AppRouter} />;
}

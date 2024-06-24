import { Navigate } from 'react-router-dom';
import App from '../../App';
import { AuthenticationService } from '../authentication/authentication.service';

export function ProtectedRoute() {
  if (!AuthenticationService.hasValidAuthToken) return <Navigate to="/login" />;

  return <App />;
}

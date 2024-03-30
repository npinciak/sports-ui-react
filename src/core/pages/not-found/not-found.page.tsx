import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/home">Go Home</Link>
    </div>
  );
}

import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <Link to="baseball/2024/league/548464880">League</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
      <div>
        <Link to="/admin/league-progression">Admin</Link>
      </div>
    </div>
  );
}

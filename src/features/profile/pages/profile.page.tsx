import { Link } from 'react-router-dom';
import { useGetProfileWithTeamsQuery } from '../../../@shared/supabase/supabase.client';

export function ProfilePage() {
  const { data: profile, isLoading } = useGetProfileWithTeamsQuery({});

  return (
    <div className="grid grid-cols-3 text-left mb-5 mt-5">
      <div>
        {isLoading ? (
          <div className="animate-pulse">Loading...</div>
        ) : (
          <>
            <div>
              <h1>Profile</h1>
              <div>{profile?.user_name}</div>
              <div>{profile?.bio}</div>
            </div>
          </>
        )}
      </div>
      <div>
        <h2>Teams</h2>
        {profile?.teams.map(team => (
          <div key={team!.team!.id}>
            <div>{team!.team!.name}</div>
          </div>
        ))}
      </div>
      <div>
        <h2>Teams</h2>
        {profile?.leagues.map(league => (
          <div key={league!.league!.id}>
            <Link
              to={`/${league!.league!.sport }/${league!.league!.season}/league/${league!.league!.league_id}`}
            >
              {league!.league!.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

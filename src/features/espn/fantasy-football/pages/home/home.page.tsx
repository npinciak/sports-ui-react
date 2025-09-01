import { useParams } from 'react-router-dom';
import { EspnFantasyClientV3 } from '../../../client/espn-fantasy-v3.client';

export function FootballHome() {
  const { year, leagueId } = useParams<{ year: string; leagueId: string }>();

  const { data } = EspnFantasyClientV3.useGetFootballLeagueQuery({
    year: year ?? '',
    leagueId: leagueId ?? '',
  });

  return (
    <div>
      <h1>Welcome to the Fantasy Football Home Page</h1>
      <p>Here you can manage your fantasy football teams and leagues.</p>
    </div>
  );
}

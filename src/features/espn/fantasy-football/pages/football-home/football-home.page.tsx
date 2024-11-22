import { useParams } from 'react-router-dom';
import { useFetchLeagueByIdQuery } from '../../client/fantasy-football.client';

export function FootballHomePage() {
  const { year, leagueId } = useParams<{ year: string; leagueId: string }>();

 useFetchLeagueByIdQuery({
    year: year ?? '',
    leagueId: leagueId ?? '',
  });
  return (
    <div>
      <h1>Football Home Page</h1>
    </div>
  );
}

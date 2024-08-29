import { useFetchLineupHeadquarterPlayersBySportQuery } from '../../handlers/lineup-hq.handler';

export function FootballHomePage() {
  const { data: lineupHeadquarterPlayers } =
    useFetchLineupHeadquarterPlayersBySportQuery({
      sport: 'nfl',
    });

  return (
    <div>
      <h1>Football Home Page</h1>
    </div>
  );
}

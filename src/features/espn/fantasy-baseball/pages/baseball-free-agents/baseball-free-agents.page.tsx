import { useParams } from 'react-router-dom';
import { EspnFantasyClientV3 } from 'src/features/espn/client/espn-fantasy-v3.client';
import { BaseballLeagueHeader } from '../../components/baseball-league-header.component';
import { DEFAULT_FILTER } from 'src/features/espn/helpers/filter-builder/filter-builder';

export function BaseballFreeAgents() {
  const { year, leagueId } = useParams<{ year: string; leagueId: string }>();

  const { data } = EspnFantasyClientV3.useGetBaseballLeagueQuery({
    year: year ?? '',
    leagueId: leagueId ?? '',
  });

  console.log(DEFAULT_FILTER);

  return (
    <div>
      <BaseballLeagueHeader isLoading={false} league={data} />
    </div>
  );
}

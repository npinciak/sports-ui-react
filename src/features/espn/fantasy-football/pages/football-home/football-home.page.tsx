import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../../../../core/components/page-wrapper/page-wrapper.component';
import { useFetchLeagueByIdQuery } from '../../client/fantasy-football.client';
import { getTeamList } from '../../selectors/football-team.selector';

export function FootballHomePage() {
  const { year, leagueId } = useParams<{ year: string; leagueId: string }>();

  const teams = useSelector(getTeamList);

  useFetchLeagueByIdQuery({
    year: year ?? '',
    leagueId: leagueId ?? '',
  });

  console.log(teams);
  return (
    <PageWrapper
      title="Football Home"
      subTitle="Welcome to the football home page"
    >
      <div>
        <h1>Football Home Page</h1>
      </div>
    </PageWrapper>
  );
}

import { useParams } from 'react-router-dom';
import PageWrapper from '../../../../../core/components/page-wrapper/page-wrapper.component';
import { useFetchLeagueByIdQuery } from '../../client/fantasy-football.client';

export function FootballHomePage() {
  const { year, leagueId } = useParams<{ year: string; leagueId: string }>();

  useFetchLeagueByIdQuery({
    year: year ?? '',
    leagueId: leagueId ?? '',
  });
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

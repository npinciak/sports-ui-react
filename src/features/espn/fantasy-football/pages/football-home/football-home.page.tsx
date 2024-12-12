import { Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../../../../core/components/page-wrapper/page-wrapper.component';
import { useFetchLeagueByIdQuery } from '../../client/fantasy-football.client';
import {
  getTeamStandingsList,
  getTopThreeScoringTeamsList,
} from '../../selectors/football-team.selector';

export function FootballHomePage() {
  const { year, leagueId } = useParams<{ year: string; leagueId: string }>();

  const topThreeScoringTeams = useSelector(getTopThreeScoringTeamsList);
  const teamStandingsList = useSelector(getTeamStandingsList);

  useFetchLeagueByIdQuery({
    year: year ?? '',
    leagueId: leagueId ?? '',
  });

  return (
    <PageWrapper
      title="Football Home"
      subTitle="Welcome to the football home page"
    >
      <Card title="Top 3 Scoring Teams">
        <CardContent>
          {topThreeScoringTeams.map(team => (
            <div key={team.id}>
              {team.name} - {team.pointsFor.toFixed(0)}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card title="Standings">
        <CardContent>
          {teamStandingsList.map(team => (
            <Grid container>
              <Grid display="flex" alignItems="center">
                <img
                  width="48"
                  height="35"
                  role="presentation"
                  className="h-8 w-8"
                  title={team?.name}
                  alt={team?.name}
                  src={team?.logo}
                />
              </Grid>
              <Grid display="flex" alignItems="center">
                <a title={team?.name} tabIndex={-1}>
                  <strong>{team?.currentRank}</strong> {team?.name}
                </a>
                <p>
                  {team?.wins} - {team?.losses}
                </p>
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

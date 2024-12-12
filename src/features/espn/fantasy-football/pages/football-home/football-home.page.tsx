import { Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../../../../core/components/page-wrapper/page-wrapper.component';
import { useFetchLeagueByIdQuery } from '../../client/fantasy-football.client';
import {
  getTeamList,
  getTeamStandingsList,
  getTopThreeScoringTeamsList,
} from '../../selectors/football-team.selector';

export function FootballHomePage() {
  const { year, leagueId } = useParams<{ year: string; leagueId: string }>();

  const teams = useSelector(getTeamList);
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
      <div>
        <h1>Football Home Page</h1>
      </div>
      <Card title="Top 3 Scoring Team">
        <CardContent>
          {topThreeScoringTeams.map((team, i) => (
            <div key={team.id}>
              {team.name} - {team.pointsFor.toFixed(0)}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card title="Standings">
        <CardContent>
          {teamStandingsList.map((team, i) => (
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

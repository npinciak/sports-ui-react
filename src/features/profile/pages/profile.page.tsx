import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { SupabaseClient } from '../../../@shared/supabase/supabase.client';
import {
  LeagueRoute,
  RouteBuilder,
  TeamRoute,
} from '../../../core/routes/route-builder';

export function ProfilePage() {
  const {
    data: profile,
    isLoading,
    isFetching,
  } = SupabaseClient.useGetProfileWithTeamsQuery();

  const navigate = useNavigate();

  const { teamByTeamIdRoute, leagueByLeagueIdRoute } = RouteBuilder();

  const handleToNavigateToTeam = ({
    sport,
    season,
    leagueId,
    teamId,
  }: TeamRoute) =>
    navigate(teamByTeamIdRoute({ sport, season, leagueId, teamId }));

  const handleToNavigateToLeague = ({ leagueId, sport, season }: LeagueRoute) =>
    navigate(leagueByLeagueIdRoute({ sport, season, leagueId }));

  if (isLoading || isFetching)
    return <div className="animate-pulse">Loading...</div>;

  return (
    <Box marginTop={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Profile</h1>
        </Grid>
        <Grid item xs={12}>
          <Divider>Teams</Divider>
          {profile?.teams.map(team => (
            <Box sx={{ marginBottom: '16px' }} key={team.team.id}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar
                      alt={team.team.name?.toUpperCase()}
                      src="./"
                      aria-label={team.team.name ?? ''}
                    />
                  }
                  title={team.team.name}
                  subheader={team.team.fantasy_league_name}
                  action={
                    <IconButton
                      aria-label="navigate"
                      onClick={() =>
                        handleToNavigateToTeam({
                          sport,
                          season,
                          leagueId,
                          teamId,
                        })
                      }
                    >
                      <ArrowForwardIosIcon fontSize="medium" />
                    </IconButton>
                  }
                />
              </Card>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Divider>Leagues</Divider>
          {profile?.leagues.map(league => (
            <Box sx={{ marginBottom: '16px' }} key={league.league.id}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar
                      alt={league.league.name?.toUpperCase()}
                      src="./"
                      aria-label={league.league.name ?? ''}
                    />
                  }
                  title={league.league.name}
                  subheader={league.league.fantasy_league_name}
                  action={
                    <IconButton
                      aria-label="navigate"
                      onClick={() =>
                        handleToNavigateToLeague({
                          season: league.league.season,
                          leagueId: league.league.league_id,
                          sport: league.league.sport,
                        })
                      }
                    >
                      <ArrowForwardIosIcon fontSize="medium" />
                    </IconButton>
                  }
                />
              </Card>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

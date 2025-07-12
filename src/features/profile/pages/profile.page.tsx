import { AddCircleOutlineTwoTone } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import { SupabaseClient } from '@shared//supabase/supabase.client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LeagueRoute,
  RouteBuilder,
  TeamRoute,
} from '../../../core/routes/route-builder';
import { AddLeagueFormComponent } from '../components/add-league-form.component';

export function ProfilePage() {
  const {
    data: profile,
    isLoading,
    isFetching,
  } = SupabaseClient.useGetProfileQuery();

  const { data: teams } = SupabaseClient.useGetProfileTeamsQuery();

  const { data: leagues } = SupabaseClient.useGetProfileLeaguesQuery();

  const [isAddLeagueFormDialogOpen, setIsAddLeagueFormDialogOpen] =
    useState<boolean>(false);

  const [isAddTeamFormDialogOpen, setIsAddTeamFormDialogOpen] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const { teamByTeamIdRoute, leagueByLeagueIdRoute } = RouteBuilder();

  const handleNavigateToTeam = ({
    sport,
    season,
    leagueId,
    teamId,
  }: TeamRoute) => {
    navigate(teamByTeamIdRoute({ sport, season, leagueId, teamId }));
  };

  const handleToNavigateToLeague = ({ leagueId, sport, season }: LeagueRoute) =>
    navigate(leagueByLeagueIdRoute({ sport, season, leagueId }));

  if (isLoading || isFetching)
    return <div className="animate-pulse">Loading...</div>;

  const openAddLeagueFormDialog = () => {
    setIsAddLeagueFormDialogOpen(true);
  };

  const openAddTeamFormDialog = () => {
    setIsAddTeamFormDialogOpen(true);
  };

  const closeAddTeamFormDialog = () => {
    setIsAddTeamFormDialogOpen(false);
  };

  const closeAddLeagueFormDialog = () => {
    setIsAddLeagueFormDialogOpen(false);
  };

  return (
    <Box marginTop={2}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Divider>Profile</Divider>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignContent={'center'}>
                <Grid size={12}>
                  <Avatar
                    alt={profile?.user_name}
                    src="./"
                    aria-label={profile?.user_name ?? ''}
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12}>
          <Divider>Teams</Divider>
          {teams?.map(team => (
            <Box sx={{ marginBottom: '16px' }} key={team.id}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar
                      alt={team.name?.toUpperCase()}
                      src="./"
                      aria-label={team.name ?? ''}
                    />
                  }
                  title={team.name}
                  subheader={team.league_name}
                  action={
                    <IconButton
                      aria-label="navigate"
                      onClick={() =>
                        handleNavigateToTeam({
                          season: team?.league_season?.toString(),
                          leagueId: team.league_id,
                          sport: team.sport,
                          teamId: team.espn_team_id?.toString(),
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
          <Box sx={{ marginBottom: '16px' }}>
            <Card>
              <CardHeader
                subheader="Add Team"
                action={
                  <IconButton aria-label="add" onClick={openAddTeamFormDialog}>
                    <AddCircleOutlineTwoTone fontSize="medium" />
                  </IconButton>
                }
              />
            </Card>
          </Box>
        </Grid>
        <Grid size={12}>
          <Divider>Leagues</Divider>
          {leagues?.map(league => (
            <Box sx={{ marginBottom: '16px' }} key={league.id}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar
                      alt={league?.league_name?.toUpperCase()}
                      src="./"
                      aria-label={league?.league_name ?? ''}
                    />
                  }
                  title={league?.league_name}
                  subheader={league?.league_season}
                  action={
                    <IconButton
                      aria-label="navigate"
                      onClick={() =>
                        handleToNavigateToLeague({
                          season: league?.league_season?.toString(),
                          leagueId: league?.league_id,
                          sport: league?.sport,
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
          <Box sx={{ marginBottom: '16px' }}>
            <Card>
              <CardHeader
                subheader="Add League"
                action={
                  <IconButton
                    aria-label="add"
                    onClick={openAddLeagueFormDialog}
                  >
                    <AddCircleOutlineTwoTone fontSize="medium" />
                  </IconButton>
                }
              />
            </Card>
          </Box>
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        autoFocus={isAddTeamFormDialogOpen}
        open={isAddTeamFormDialogOpen}
        onClose={closeAddTeamFormDialog}
        title="Add Team"
      >
        <DialogContent>
          <AddLeagueFormComponent />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddTeamFormDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        autoFocus={isAddLeagueFormDialogOpen}
        open={isAddLeagueFormDialogOpen}
        onClose={closeAddLeagueFormDialog}
        title="Add League"
      >
        <DialogContent>
          <AddLeagueFormComponent />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddLeagueFormDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

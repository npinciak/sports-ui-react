import { RefreshOutlined, SyncOutlined } from '@mui/icons-material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { SupaClientLeagueProgressionInsert } from '@shared/supabase/supabase-tables.model';
import { SupabaseClient } from '@shared/supabase/supabase.client';
import { useState } from 'react';
import { BaseballTeamEntity } from '../models/baseball-team.model';

interface BaseballTeamHeaderProps {
  isLoading: boolean;
  team: BaseballTeamEntity | undefined;
  leagueId?: string | number;
}

export function BaseballTeamHeader({
  isLoading,
  team,
  leagueId,
}: BaseballTeamHeaderProps) {
  if (!team && !isLoading) return null;

  const [handleCreateLeagueProgressionEntity] =
    SupabaseClient.useCreateLeagueProgressionEntityMutation();

  const handleSubmit = () => {
    const totalpoints = team?.totalPoints;
    const rank = team?.currentRank;
    if (!totalpoints || !rank || !leagueId || !team.id)
      throw new Error('Missing required fields');

    const form: SupaClientLeagueProgressionInsert = {
      espn_team_id: Number(team.id),
      total_points: Number(totalpoints),
      espn_league_id: leagueId.toString(),
      rank: Number(rank),
    };

    console.log(form);
    handleClose();
    handleCreateLeagueProgressionEntity(form);
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Paper elevation={2} className="mt-4 p-4 mb-4">
      <Grid container spacing={3} className="mb-2">
        <Grid
          size={{ xs: 4, sm: 2 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {isLoading ? (
            <Skeleton variant="circular" width={88} height={88} />
          ) : (
            <Avatar
              sx={{
                width: 88,
                height: 88,
                border: '1px solid #e0e0e0',
              }}
              src={team?.logo}
              alt={team?.name}
            />
          )}
        </Grid>
        <Grid size={{ xs: 8, sm: 10 }}>
          {isLoading ? (
            <>
              <Skeleton width="60%">
                <Typography variant="h5">Team Name</Typography>
              </Skeleton>
              <Skeleton width="30%">
                <Typography variant="body2">Additional Info</Typography>
              </Skeleton>
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {team?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {team?.currentRank && `Current Rank: ${team.currentRank}`}
                {team?.totalPoints && ` • Points: ${team.totalPoints}`}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {leagueId && (
                  <Button
                    variant="outlined"
                    size="small"
                    href={`https://fantasy.espn.com/baseball/team?leagueId=${leagueId}&teamId=${team?.id}`}
                    target="_blank"
                    startIcon={<OpenInNewIcon />}
                    sx={{ mr: 1 }}
                  >
                    View on ESPN
                  </Button>
                )}
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleOpen}
                  startIcon={<SyncOutlined />}
                  sx={{ mr: 1 }}
                >
                  Sync
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleOpen}
                  startIcon={<RefreshOutlined />}
                  sx={{ mr: 1 }}
                >
                  Refresh
                </Button>
                <Dialog
                  fullWidth={true}
                  maxWidth={'sm'}
                  open={open}
                  onClose={handleClose}
                >
                  <DialogContent>
                    <DialogTitle>Confirm sync</DialogTitle>
                    <DialogContentText>
                      <p>Team: {team?.name}</p>
                      <p>Current Rank: {team?.currentRank}</p>
                      <p>Points: {team?.totalPoints}</p>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Ok</Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

import { Avatar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FastcastEventTeam } from '../models/fastcast-team.model';

interface FastcastTeamComponentProps {
  team: FastcastEventTeam | undefined;
}

export function FastcastTeamComponent({ team }: FastcastTeamComponentProps) {
  return (
    <Grid container className="w-full py-2 ">
      <Grid size={2} alignContent={'center'}>
        <Avatar src={team?.logo} alt={team?.name} />
      </Grid>
      <Grid size={6} alignContent={'center'}>
        <Typography variant="body2">
          {team?.rank} {team?.name}
        </Typography>
        <Typography variant="caption">{team?.record}</Typography>
      </Grid>
      <Grid size={4} className="font-bold text-right" alignContent={'center'}>
        <Typography variant="body2">{team?.score}</Typography>
      </Grid>
    </Grid>
  );
}

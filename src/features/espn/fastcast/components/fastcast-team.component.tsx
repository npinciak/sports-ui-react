import { Grid } from '@mui/material';
import { FastcastEventTeam } from '../models/fastcast-team.model';

export function FastcastTeamComponent({
  team,
}: {
  team: FastcastEventTeam | undefined;
}) {
  return (
    <Grid container className="w-full py-2 ">
      <Grid item xs={2} alignContent={'center'}>
        <img
          width="48"
          height="35"
          role="presentation"
          className="h-10 w-10"
          title={team?.name}
          alt={team?.name}
          src={team?.logo}
        />
      </Grid>
      <Grid item xs={6} alignContent={'center'}>
        <div
          className="font-semibold"
          style={{ color: team?.color ?? '#000000' }}
        >
          {team?.rank} {team?.name}
        </div>
        <div className="text-xs">{team?.record}</div>
      </Grid>
      <Grid
        item
        xs={4}
        className="font-bold text-right"
        alignContent={'center'}
        style={{ color: team?.color ?? '#000000' }}
      >
        {team?.score}
      </Grid>
    </Grid>
  );
}

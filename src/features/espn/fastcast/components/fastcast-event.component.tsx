import { Card, CardContent, Divider, Grid } from '@mui/material';
import { FastcastEvent } from '../models/fastcast-event.model';
import { fastcastEventSummary } from '../transformers/espn-fastcast.transformers';
import { FastcastTeamComponent } from './fastcast-team.component';

interface FastcastEventComponentProps {
  event: FastcastEvent;
}

export function FastcastEventComponent({ event }: FastcastEventComponentProps) {
  return (
    <div className="mb-4 w-full" key={event.uid}>
      <Card sx={{ borderRadius: '20px' }}>
        <CardContent>
          <Grid
            container
            className="w-full mb-2 text-xs font-semibold truncate"
          >
            {fastcastEventSummary(event)}
          </Grid>
          <Grid container className="w-full mb-2">
            <FastcastTeamComponent team={event.teams?.away} />{' '}
            <Divider />
            <FastcastTeamComponent team={event.teams?.home} />{' '}
          </Grid>
          <Grid container className="w-full mb-2 text-xs">
            <Grid item xs={12}>
              {event.footballSituation?.shortDownDistanceText}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

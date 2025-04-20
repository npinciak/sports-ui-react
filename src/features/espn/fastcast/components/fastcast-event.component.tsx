import { Card, CardContent, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FastcastEvent } from '../models/fastcast-event.model';
import { fastcastEventSummary } from '../transformers/espn-fastcast.transformers';
import { FastcastTeamComponent } from './fastcast-team.component';

interface FastcastEventComponentProps {
  event: FastcastEvent;
}

export function FastcastEventComponent({ event }: FastcastEventComponentProps) {
  return (
    <>
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
              <FastcastTeamComponent team={event.teams?.away} />
              <Divider />
              <FastcastTeamComponent team={event.teams?.home} />
            </Grid>
            {event.state === 'in' && (
              <Grid container className="w-full mb-2 text-xs" columnSpacing={1}>
                <Grid size={12}>
                  {event.lastPlay?.text}
                  {event.drive?.description}
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

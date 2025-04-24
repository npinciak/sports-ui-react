import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Avatar,
  Box,
  Button,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BaseballImageHelper } from '../helpers/baseball-image.helper';
import { BaseballLeague } from '../models/baseball-league.model';

interface BaseballLeagueHeaderProps {
  isLoading: boolean;
  league: BaseballLeague | undefined;
}

export function BaseballLeagueHeader({
  isLoading,
  league,
}: BaseballLeagueHeaderProps) {
  if (!league && !isLoading) return null;

  const leagueName = league?.name || null;

  const year = league?.seasonId ? `${league.seasonId} Season` : null;

  const leagueType = league?.scoringType || null;

  const teamCount = league?.size ? `${league.size} Teams` : null;

  const scoringPeriodId = league?.scoringPeriodId
    ? `Day ${league.scoringPeriodId}`
    : 'Preseason';

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
              src={BaseballImageHelper.fantasySportLeagueImage}
              alt={leagueName ?? '-'}
            />
          )}
        </Grid>
        <Grid size={{ xs: 8, sm: 10 }}>
          {isLoading ? (
            <>
              <Skeleton width="60%">
                <Typography variant="h5">League Name</Typography>
              </Skeleton>
              <Skeleton width="40%">
                <Typography variant="body1">League Details</Typography>
              </Skeleton>
              <Skeleton width="30%">
                <Typography variant="body2">Additional Info</Typography>
              </Skeleton>
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {leagueName ?? '-'}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {year ?? '-'} • {leagueType ?? '-'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {teamCount ?? '-'} • {scoringPeriodId ?? '-'}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  href={`https://fantasy.espn.com/baseball/league?leagueId=${league?.id}`}
                  target="_blank"
                  startIcon={<OpenInNewIcon />}
                  sx={{ mr: 1 }}
                >
                  View on ESPN
                </Button>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

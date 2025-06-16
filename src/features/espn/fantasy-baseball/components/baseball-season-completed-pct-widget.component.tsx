import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { WidgetCard } from '../../../../@shared/components/widget-card.component';

interface SeasonCompletedPctWidgetProps {
  seasonCompletedPct: number;
}

export function BaseballSeasonCompletedPctWidget({
  seasonCompletedPct,
}: SeasonCompletedPctWidgetProps) {
  const formattedPct = `${seasonCompletedPct.toFixed(1)}%`;

  return (
    <WidgetCard title="Season Completed" value={formattedPct} isEmpty={false}>
      <Box sx={{ width: '100%', mt: 1 }}>
        <LinearProgress
          variant="determinate"
          value={seasonCompletedPct}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            0%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            100%
          </Typography>
        </Box>
      </Box>
    </WidgetCard>
  );
}

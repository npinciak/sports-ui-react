import { LocalHospital } from '@mui/icons-material';
import { Chip, Tooltip, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import { BaseballPlayerEntity } from '../../models/baseball-player.model';

interface BaseballLineupCardProps {
  player: BaseballPlayerEntity;
  onClick: (playerId: string) => void;
}

export function BaseballLineupCard({
  player,
  onClick,
}: BaseballLineupCardProps) {
  return (
    <Grid
      container
      role="article"
      aria-label={player.name}
      className="py-3 w-full"
      onClick={() => onClick(player.id)}
    >
      <Grid size={3}>
        <Avatar src={player.img} alt={player.name} />
      </Grid>
      <Grid size={6}>
        <Typography variant="body1">
          {player.name} {player.health!.isInjured ? <LocalHospital /> : ''}
        </Typography>
        <div className="text-xs">
          <Typography variant="body2">
            {player.team},
            <span className="font-bold"> {player.lineupSlot}</span>
          </Typography>
        </div>
      </Grid>
      <Grid size={3}>
        {player.isStarting && (
          <Tooltip
            title={
              player.isStarting && !player.health!.isInjured
                ? 'Starting'
                : 'Not Starting'
            }
          >
            <Chip
              label="Starting"
              size="small"
              sx={{ color: 'white', backgroundColor: '#047857' }}
            />
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
}

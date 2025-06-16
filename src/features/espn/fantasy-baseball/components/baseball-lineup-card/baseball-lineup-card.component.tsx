import { LocalHospital } from '@mui/icons-material';
import { Chip, Tooltip, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import { COLOR } from 'src/app.theme';
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
        {player.isInStartingLineup && (
          <Tooltip
            title={
              player.isInStartingLineup && !player.health!.isInjured
                ? 'Starting'
                : null
            }
          >
            <Chip
              label="Starting"
              size="small"
              sx={{ color: 'white', backgroundColor: COLOR.DYNAMIC_GREEN }}
            />
          </Tooltip>
        )}

        {player.isNotInStartingLineup && (
          <Tooltip
            title={
              player.isNotInStartingLineup && !player.health!.isInjured
                ? 'Not in starting lineup'
                : null
            }
          >
            <Chip
              label="Not Starting"
              size="small"
              sx={{ color: 'white', backgroundColor: COLOR.STRIKE_RED }}
            />
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
}

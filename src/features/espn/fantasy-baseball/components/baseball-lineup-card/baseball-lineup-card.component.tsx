import { LocalHospital } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import StyledBadge from '@mui/material/Badge';
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
      className="py-3"
      onClick={() => onClick(player.id)}
    >
      <Grid size={3}>
        <Tooltip
          title={
            player.isStarting && !player.health!.isInjured
              ? 'Starting'
              : 'Not Starting'
          }
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            variant="dot"
            color={player.isStarting ? 'success' : 'error'}
          >
            <Avatar src={player.img} alt={player.name} />
          </StyledBadge>
        </Tooltip>
      </Grid>
      <Grid size={9}>
        <Typography variant="body1">
          {player.name} {player.health!.isInjured ? <LocalHospital /> : ''}
        </Typography>
        <div className="text-xs">
          <Typography variant="body2">
            {player.team}
            <span className="font-bold"> {player.lineupSlot}</span>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}

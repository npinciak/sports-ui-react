import { LocalHospital } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import StyledBadge from '@mui/material/Badge';
import { BaseballPlayer } from '../../models/baseball-player.model';

export function BaseballLineupCard({ players }: { players: BaseballPlayer[] }) {
  return players.map(player => (
    <div className="grid grid-cols-4 py-3" key={player.id}>
      <div>
        <Tooltip
          title={
            player.isStarting && !player.injured ? 'Starting' : 'Not Starting'
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
      </div>
      <div className="col-span-3">
        <Typography variant="body1">
          {player.name} {player.injured ? <LocalHospital /> : ''}
        </Typography>
        <div className="text-xs">
          <Typography variant="body2">
            {player.team}
            <span className="font-bold"> {player.lineupSlot}</span>
          </Typography>
        </div>
      </div>
    </div>
  ));
}

import Avatar from '@mui/material/Avatar';
import StyledBadge from '@mui/material/Badge';
import { BaseballPlayer } from '../../models/baseball-player.model';

export function BaseballLineupCard({ players }: { players: BaseballPlayer[] }) {
  return players.map(player => (
    <div className="grid grid-cols-4 py-3" key={player.id}>
      <div>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color={player.isStarting ? 'success' : 'error'}
        >
          <Avatar src={player.img} alt={player.name} />
        </StyledBadge>
      </div>
      <div className="col-span-3">
        {player.name}
        <div className="text-xs">
          {player.team}
          <span className="font-bold"> {player.lineupSlot}</span>
        </div>
      </div>
    </div>
  ));
}

import { BaseballPlayer } from '../../models/baseball-player.model';

export function BaseballLineupCard({ players }: { players: BaseballPlayer[] }) {
  return players.map(player => (
    <div className="grid grid-cols-4 py-3" key={player.id}>
      <div>
        <img
          className="w-13 h-9 rounded-full text-center text-xs text-gray-500"
          src={player.img}
          alt={player.name}
          role="presentation"
          aria-roledescription="presentation"
        />
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

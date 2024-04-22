import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../../app.store';
import { BaseballTeamSelector } from '../../selectors';
import { BaseballTeamLiveEntitySelectors } from '../../selectors/baseball-team-live.selector';

export function BaseballTeam() {
  const { teamId } = useParams();

  const { totalPoints } = useSelector((state: RootState) =>
    BaseballTeamLiveEntitySelectors.selectById(state, teamId!)
  );

  const { id, name, logo, currentRank, roster } = useSelector(
    (state: RootState) => BaseballTeamSelector.selectById(state, teamId!)
  );

  return (
    <div key={id}>
      <div className="grid grid-cols-3 text-left mb-5 mt-5">
        <div>
          <img
            alt={name}
            role="presentation"
            aria-roledescription="presentation"
            src={logo}
          />
        </div>
        <div className="col-span-2">
          <h1>
            {name} {totalPoints}
          </h1>
          <div>
            <span className="text-xs">Rank: {currentRank}</span>
          </div>
        </div>
      </div>

      <div className="text-left">
        {roster.map(player => (
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
                {player.team}{' '}
                <span className="font-bold">{player.position}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

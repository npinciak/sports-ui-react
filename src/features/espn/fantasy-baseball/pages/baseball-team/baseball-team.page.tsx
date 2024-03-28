import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../../app.store';
import { BaseballTeamSelector } from '../../selectors';
import { BaseballTeamLiveSelector } from '../../selectors/baseball-team-live.selector';

export function BaseballTeam() {
  const { teamId } = useParams();

  const { totalPoints } = useSelector((state: RootState) =>
    BaseballTeamLiveSelector.selectById(state, teamId!)
  );

  const { id, name, roster } = useSelector((state: RootState) =>
    BaseballTeamSelector.selectById(state, teamId!)
  );

  return (
    <div key={id}>
      <h1>
        {name} {totalPoints}
      </h1>

      <ul>
        {roster.map(player => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
}

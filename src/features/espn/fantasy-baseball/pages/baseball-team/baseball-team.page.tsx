import { useParams } from 'react-router-dom';

export function BaseballTeam() {
  const { teamId } = useParams();

  return (
    <div>
      <h1>Fantasy Baseball Team {teamId}</h1>
    </div>
  );
}

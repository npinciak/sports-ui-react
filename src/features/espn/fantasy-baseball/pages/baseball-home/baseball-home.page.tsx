import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BaseballStat } from 'sports-ui-sdk';
import { BaseballTeamSelector } from '../../selectors';

export function BaseballHome() {
  return (
    <div>
      <h1>Fantasy Baseball Home</h1>

      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>R</th>
            <th>RBI</th>
            <th>HR</th>
            <th>SB</th>
            <th>AVG</th>
            <th>K</th>
            <th>W</th>
            <th>SV</th>
            <th>HD</th>
            <th>ERA</th>
          </tr>
        </thead>
        <tbody>
          {useSelector(BaseballTeamSelector.selectAll).map(team => {
            return (
              <tr key={team.id}>
                <td align="left">
                  <Link to={`team/${team.id}`}>{team.name}</Link>
                </td>
                <td>{team.valuesByStat[BaseballStat.R]}</td>
                <td>{team.valuesByStat[BaseballStat.RBI]} </td>
                <td>{team.valuesByStat[BaseballStat.HR]}</td>
                <td>{team.valuesByStat[BaseballStat.SB]}</td>
                <td>{team.valuesByStat[BaseballStat.AVG]}</td>
                <td>{team.valuesByStat[BaseballStat.K]}</td>
                <td>{team.valuesByStat[BaseballStat.W]}</td>
                <td>{team.valuesByStat[BaseballStat.SV]}</td>
                <td>{team.valuesByStat[BaseballStat.HD]}</td>
                <td>{team.valuesByStat[BaseballStat.ERA]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

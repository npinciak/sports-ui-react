import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BaseballStat } from 'sports-ui-sdk';
import { useGetLeagueProgressionQuery } from '../../../../../@shared/supabase/supabase.client';
import { BaseballTeamSelector, standings } from '../../selectors';

export function BaseballHome() {
  const { data: teams } = useGetLeagueProgressionQuery({});

  const liveStandings = useSelector(standings);

  return (
    <>
      <h1>Fantasy Baseball Home</h1>
      <div className="flex">
        <div className="flex-1">
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
        <div className="flex-1">
          {liveStandings.map(team => {
            return (
              <ul key={team.id}>
                <li>
                  {team.team.name} - {team.liveScore}
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
}

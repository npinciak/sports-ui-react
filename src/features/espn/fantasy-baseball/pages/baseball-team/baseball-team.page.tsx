import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetFangraphsConstantsBySeasonQuery } from '../../../../../@shared/supabase/supabase.client';
import { RootState } from '../../../../../app.store';
import { BaseballPlayerStatsTable } from '../../components';
import { BaseballScoringPeriod } from '../../helpers';
import {
  BaseballTeamEntitySelector,
  selectTeamBatterStats,
  selectTeamStartingLineupBatters,
  selectTeamStartingLineupPitchers,
} from '../../selectors';
import { BaseballTeamLiveEntitySelectors } from '../../selectors/baseball-team-live.selector';

export function BaseballTeam() {
  const { teamId, leagueId, year } = useParams();

  const { data: fangraphs } = useGetFangraphsConstantsBySeasonQuery({
    seasonId: year!,
  });

  const { totalPoints } = useSelector((state: RootState) =>
    BaseballTeamLiveEntitySelectors.selectById(state, teamId!)
  );

  const { id, name, logo, currentRank, roster } = useSelector(
    (state: RootState) => BaseballTeamEntitySelector.selectById(state, teamId!)
  );

  const startingBatters = useSelector(selectTeamStartingLineupBatters)(teamId!);
  const startingPitchers = useSelector(selectTeamStartingLineupPitchers)(
    teamId!
  );

  const playerStats = useSelector(selectTeamBatterStats)(
    teamId!,
    BaseballScoringPeriod.season(year!)
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

      <div className="flex text-left">
        <div className="w-full px-4 xl:w-4/12">
          {startingBatters.map(player => (
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
          ))}

          <div className="py-3"></div>
          {startingPitchers.map(player => (
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
          ))}
        </div>
        <div className="w-full px-4 xl:w-8/12">
          <BaseballPlayerStatsTable data={playerStats} />
        </div>
      </div>
    </div>
  );
}

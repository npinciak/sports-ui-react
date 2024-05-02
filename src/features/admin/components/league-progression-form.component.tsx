import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SupaClientLeagueProgressionInsert } from '../../../@shared/supabase/supabase-tables.model';
import {
  useCreateLeagueProgressionEntityMutation,
  useGetProfileWithTeamsQuery,
} from '../../../@shared/supabase/supabase.client';
import {
  selectEspnTeamId,
  selectLeagueId,
  selectLeagueTeamId,
  selectRank,
  selectTotalPoints,
} from '../selectors/league-progression-form.selector';
import {
  setEspnTeamId,
  setLeagueId,
  setLeagueTeamId,
  setRank,
  setTotalPoints,
} from '../slices/league-progression-form.slice';

const fieldStyles = {
  input:
    'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
  inputLabel: 'block text-sm font-medium leading-6 text-gray-900',
  submitButton:
    'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
};

export function AdminLeagueProgressionForm() {
  const { data: profileTeams } = useGetProfileWithTeamsQuery({});

  const teams = profileTeams != undefined ? profileTeams.teams : [];

  const dispatch = useDispatch();

  const getLeagueId = useSelector(selectLeagueId);
  const getLeagueTeamId = useSelector(selectLeagueTeamId);
  const getTotalPoints = useSelector(selectTotalPoints);
  const getRank = useSelector(selectRank);
  const getEspnTeamId = useSelector(selectEspnTeamId);

  const [handleCreateLeagueProgressionEntity] =
    useCreateLeagueProgressionEntityMutation();

  const handleCancel = () => {};

  const handleSubmit = () => {
    if (
      !getLeagueTeamId ||
      !getTotalPoints ||
      !getRank ||
      !getLeagueId ||
      !getEspnTeamId
    )
      throw new Error('Missing required fields');

    const form: SupaClientLeagueProgressionInsert = {
      espn_team_id: getEspnTeamId,
      total_points: getTotalPoints,
      league_id: getLeagueId,
      league_team_id: getLeagueTeamId,
      rank: getRank,
    };

    handleCreateLeagueProgressionEntity(form);
  };

  function handleLeagueTeamIdChange(e: ChangeEvent<HTMLSelectElement>): void {
    const espnTeamId = Number(e.target.value.split('-')[1]);
    const leagueId = e.target.value.split('-')[0];

    dispatch(setEspnTeamId(espnTeamId));
    dispatch(setLeagueId(leagueId));
    dispatch(setLeagueTeamId(e.target.value));
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>League Progression</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label className={fieldStyles.inputLabel} htmlFor="totalPoints">
                Total Points
              </label>
              <input
                type="number"
                className={fieldStyles.input}
                id="totalPoints"
                step="0.001"
                onChange={e => dispatch(setTotalPoints(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label className={fieldStyles.inputLabel} htmlFor="rank">
                Rank
              </label>
              <input
                type="number"
                className={fieldStyles.input}
                id="rank"
                onChange={e => dispatch(setRank(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label className={fieldStyles.inputLabel} htmlFor="leagueTeamId">
                Team
              </label>
              <select
                className={fieldStyles.input}
                id="leagueTeamId"
                onChange={handleLeagueTeamIdChange}
              >
                <option value="">Select a team</option>
                {teams.map(team => (
                  <option
                    key={team!.team!.id}
                    value={team!.team!.league_team_id}
                  >
                    {team!.team!.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={handleCancel}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className={fieldStyles.submitButton}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

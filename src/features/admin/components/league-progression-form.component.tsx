import {
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
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
  resetForm,
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

  const handleCancel = () => {
    dispatch(resetForm());
  };

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
      espn_team_id: Number(getEspnTeamId),
      total_points: Number(getTotalPoints),
      league_id: getLeagueId,
      league_team_id: getLeagueTeamId,
      rank: Number(getRank),
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
      <Grid container spacing={2}>
        <Grid xs={4}>
          <FormControl fullWidth>
            <TextField
              id="totalPoints"
              label="Total Points"
              variant="standard"
              type="number"
              onChange={e => dispatch(setTotalPoints(e.target.value))}
              value={getTotalPoints}
            />
          </FormControl>
        </Grid>
        <Grid xs={4}>
          <FormControl fullWidth>
            <TextField
              id="rank"
              label="Rank"
              variant="standard"
              type="number"
              onChange={e => dispatch(setRank(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid xs={4}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              {/* Team */}
            </InputLabel>
            <NativeSelect
              defaultValue={30}
              inputProps={{
                name: 'team',
                id: 'uncontrolled-native',
              }}
              onChange={handleLeagueTeamIdChange}
            >
              <option value={''}>Select a team</option>
              {teams.map(team => (
                <option key={team!.team!.id} value={team!.team!.league_team_id}>
                  {team!.team!.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Grid xs={4}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid xs={4}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

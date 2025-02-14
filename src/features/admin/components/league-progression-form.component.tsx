import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { SupabaseClient } from '../../../@shared';
import { SupaClientLeagueProgressionInsert } from '../../../@shared/supabase/supabase-tables.model';
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

export function AdminLeagueProgressionForm() {
  const { data: profileTeams } = SupabaseClient.useGetProfileWithTeamsQuery({});

  const teams = profileTeams != undefined ? profileTeams.teams : [];

  const dispatch = useDispatch();

  const getLeagueId = useSelector(selectLeagueId);
  const getLeagueTeamId = useSelector(selectLeagueTeamId);
  const getTotalPoints = useSelector(selectTotalPoints);
  const getRank = useSelector(selectRank);
  const getEspnTeamId = useSelector(selectEspnTeamId);

  const [handleCreateLeagueProgressionEntity] =
    SupabaseClient.useCreateLeagueProgressionEntityMutation();

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

  function handleLeagueTeamIdChange(e: SelectChangeEvent): void {
    const espnTeamId = Number(e.target.value.split('-')[1]);
    const leagueId = e.target.value.split('-')[0];

    dispatch(setEspnTeamId(espnTeamId));
    dispatch(setLeagueId(leagueId));
    dispatch(setLeagueTeamId(e.target.value));
  }

  const rankList = Array.from({ length: 10 }, (_, i) => {
    return { value: i + 1, label: `${i + 1}` };
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="totalPoints"
              label="Total Points"
              variant="outlined"
              type="number"
              onChange={e => dispatch(setTotalPoints(e.target.value))}
              value={getTotalPoints}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="rank-select-label">Rank</InputLabel>

            <Select
              label="Rank"
              onChange={e => dispatch(setRank(e.target.value))}
            >
              {rankList.map(place => (
                <MenuItem key={place.value} value={place.value}>
                  {place.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="team-select-label">Team</InputLabel>

            <Select label="Team" onChange={handleLeagueTeamIdChange}>
              <MenuItem value={''}>
                <em>None</em>
              </MenuItem>
              {teams.map(team => (
                <MenuItem
                  key={team!.team!.id}
                  value={team!.team!.league_team_id}
                >
                  {team!.team!.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

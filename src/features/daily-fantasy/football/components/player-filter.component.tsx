import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { NFL_TEAM_ID_TO_ABBREV_MAP } from '../models/team.model';

export function PlayerTableFilter({
  selectedTeam,
  teamList,
  selectedStatGroup,
  statGroupList,
  onSearchChange,
  onStatGroupChange,
  onTeamChange,
}: {
  selectedTeam: string;
  teamList: string[];
  selectedStatGroup: string;
  statGroupList: string[];
  onSearchChange: (search: string) => void;
  onStatGroupChange: (statGroup: string) => void;
  onTeamChange: (team: string) => void;
}) {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          onKeyUp={e =>
            onSearchChange((e.target as HTMLInputElement).value as string)
          }
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <Select
          onChange={e => onStatGroupChange(e.target.value as string)}
          fullWidth
          value={selectedStatGroup}
        >
          <MenuItem value="">All Positions</MenuItem>
          {statGroupList.map(statGroup => (
            <MenuItem key={statGroup} value={statGroup}>
              {statGroup}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item xs={12}>
        <Select
          onChange={e => onTeamChange(e.target.value as string)}
          fullWidth
          value={selectedTeam}
        >
          <MenuItem value="">All Teams</MenuItem>
          {teamList.map(team => (
            <MenuItem key={team} value={team}>
              {NFL_TEAM_ID_TO_ABBREV_MAP[team]}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </>
  );
}

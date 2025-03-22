import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  NativeSelect,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { EspnFantasyClientV3 } from 'src/features/espn/client/espn-fantasy-v3.client';
import { FANTASY_SPORTS_ABBREVIATION } from 'src/features/espn/helpers/endpoint-builder/endpoint-builder.const';
import {
  FantasySportsAbbreviation,
  FantasySportToLabelMap,
} from 'src/features/espn/helpers/endpoint-builder/endpoint-builder.model';

export function AddLeagueFormComponent() {
  const [sport, setSport] = useState<FantasySportsAbbreviation>(
    FANTASY_SPORTS_ABBREVIATION.Football
  );

  const [leagueId, setLeagueId] = useState<string>('');

  const [year, setYear] = useState<string>('');

  const [onLeagueSearch, { data, isError, isLoading, isFetching }] =
    EspnFantasyClientV3.useLazyValidateLeagueQuery();

  const onSearchLeague = async () => {
    await onLeagueSearch({
      leagueId,
      sport,
      year,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          League Id
          <TextField
            variant="outlined"
            type="number"
            onChange={e => setLeagueId(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          Sport
          <NativeSelect
            defaultValue={sport}
            onChange={e =>
              setSport(e.target.value as FantasySportsAbbreviation)
            }
          >
            <option value={FANTASY_SPORTS_ABBREVIATION.Football}>
              {FantasySportToLabelMap[FANTASY_SPORTS_ABBREVIATION.Football]}
            </option>
            <option value={FANTASY_SPORTS_ABBREVIATION.Baseball}>
              {FantasySportToLabelMap[FANTASY_SPORTS_ABBREVIATION.Baseball]}
            </option>
          </NativeSelect>
        </FormControl>
        <FormControl fullWidth>
          Year
          <NativeSelect
            defaultValue={year}
            onChange={e => setYear(e.target.value as string)}
          >
            <option value="">Reset</option>
            <option value="2025">2025</option>
          </NativeSelect>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Button fullWidth variant="contained" onClick={onSearchLeague}>
          Search
        </Button>
      </Grid>

      <Grid item xs={12}>
        {data && (
          <RadioGroup>
            
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
          
          </RadioGroup>
        )}
      </Grid>
    </Grid>
  );
}

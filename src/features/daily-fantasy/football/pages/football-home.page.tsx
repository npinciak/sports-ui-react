import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Grid,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import { useFetchLineupHeadquarterPlayersBySportQuery } from '../../handlers/lineup-hq.handler';
import { useFetchMasterSlatesBySportQuery } from '../../handlers/master-slate.handler';
import { useLazyFetchSlateByDfsSiteBySlateIdQuery } from '../../handlers/slate.handler';
import { SlatePlayerEntity } from '../../models';
import { DFS_SITES } from '../../models/dfs-site.model';
import { NFL_TEAM_ID_MAP } from '../models';

export function FootballHomePage() {
  const site = DFS_SITES.DraftKings;

  const { data: lineupHeadquarterPlayers } =
    useFetchLineupHeadquarterPlayersBySportQuery({
      sport: 'nfl',
    });

  const { data: masterSlates } = useFetchMasterSlatesBySportQuery({
    site,
    sport: 'nfl',
  });

  const [selectedStatGroup, setSelectedStatGroup] = useState<string>('qb');
  const [filteredPlayers, setFilteredSlatePlayers] = useState<
    SlatePlayerEntity[]
  >([]);

  const [fetchSlate, { data: slateData }] =
    useLazyFetchSlateByDfsSiteBySlateIdQuery();

  const statGroup = new Set(slateData?.map(slate => slate.stat_group));

  const statGroupList = Array.from(statGroup).sort((a, b) =>
    a.localeCompare(b)
  );

  const team = new Set(slateData?.map(slate => slate.player.team_id));

  const teamList = Array.from(team).sort((a, b) => a.localeCompare(b));

  function handleStatGroupChange(
    event: SelectChangeEvent<unknown>,
    _: ReactNode
  ) {
    setSelectedStatGroup(event.target.value as string);

    const filteredSlateData = slateData?.filter(slate => {
      if (event.target.value === '') return true;

      return slate.stat_group === event.target.value;
    });

    setFilteredSlatePlayers(filteredSlateData ?? []);
  }

  function handleTeamChange(event: SelectChangeEvent<unknown>, _: ReactNode) {
    const filteredSlateData = slateData?.filter(slate => {
      if (event.target.value === '') return true;

      return slate.player.team_id === event.target.value;
    });

    setFilteredSlatePlayers(filteredSlateData ?? []);
  }

  function handleSearchChange(event: React.KeyboardEvent<HTMLInputElement>) {
    const searchValue = (event.target as HTMLInputElement).value;

    const filteredSlateData = slateData?.filter(slate => {
      if (searchValue === '') return true;

      return (
        slate.player.first_name
          .trim()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        slate.player.last_name
          .trim()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    });

    setFilteredSlatePlayers(filteredSlateData ?? []);
  }

  useEffect(() => {
    if (slateData) {
      setFilteredSlatePlayers(slateData);
    }
  }, [slateData]);

  const Row = ({ index, key, style }) => (
    <Card key={key} style={style}>
      <CardHeader
        title={
          <Typography variant="h5">
            {filteredPlayers[index]?.player.first_name}{' '}
            {filteredPlayers[index]?.player.last_name}
          </Typography>
        }
        subheader={`${filteredPlayers[index]?.schedule.team_away.name} @ ${filteredPlayers[index]?.schedule.team_home.name}`}
        avatar={<Avatar>{filteredPlayers[index]?.player.position}</Avatar>}
        action={
          <>
            <Typography variant="h6">
              {filteredPlayers[index]?.schedule.salaries[0].salary}
            </Typography>
          </>
        }
      />
    </Card>
  );
  return (
    <Box marginTop={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {masterSlates?.map(slate => (
            <ListItemButton
              key={slate.importId}
              onClick={() => fetchSlate({ site, slateId: slate.importId })}
            >
              <ListItemText primary={slate.name} secondary={slate.type} />
            </ListItemButton>
          ))}
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            onKeyUp={handleSearchChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Select onChange={handleStatGroupChange} fullWidth>
            <MenuItem value="">All Positions</MenuItem>
            {statGroupList.map(statGroup => (
              <MenuItem key={statGroup} value={statGroup}>
                {statGroup}
              </MenuItem>
            ))}
          </Select>

          <Select onChange={handleTeamChange} fullWidth>
            <MenuItem value="">All Teams</MenuItem>
            {teamList.map(team => (
              <MenuItem key={team} value={team}>
                {NFL_TEAM_ID_MAP[team]}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12}>
          <FixedSizeList
            height={700}
            itemCount={filteredPlayers?.length}
            itemSize={120}
          >
            {Row}
          </FixedSizeList>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  );
}

import ReactDataGrid from '@inovua/reactdatagrid-community';
import { TypeColumn } from '@inovua/reactdatagrid-community/types';
import { FilterList } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchLineupHeadquarterPlayersBySportQuery } from '../../handlers/lineup-hq.handler';
import { useFetchMasterSlatesBySportQuery } from '../../handlers/master-slate.handler';
import { useLazyFetchSlateByDfsSiteBySlateIdQuery } from '../../handlers/slate-player.handler';
import { SlatePlayerEntity } from '../../models';
import { DFS_SITES } from '../../models/dfs-site.model';
import { TeamGameAttributes } from '../../models/game-attributes.model';
import {
  getSlatePlayerListWithGameAttributes,
  getTeamsWithHighestValue,
  getUniqueSlatePlayerStatGroupList,
  getUniqueSlatePlayerTeamList,
} from '../../selectors/slate-player.selector';
import { PlayerTableFilter } from '../components/player-filter.component';
import { useLazyFetchGameAttributesQuery } from '../handlers/game-attributes.handler';

export function FootballHomePage() {
  const site = DFS_SITES.DraftKings;

  const slatePlayerTeamList = useSelector(getUniqueSlatePlayerTeamList);
  const slateStatGroupList = useSelector(getUniqueSlatePlayerStatGroupList);
  const slatePlayerListWithGameAttributes = useSelector(
    getSlatePlayerListWithGameAttributes
  );

  const highestValueTeams = useSelector(getTeamsWithHighestValue);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  function handleDialogOpen() {
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  const [selectedStatGroup, setSelectedStatGroup] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');

  const [filteredPlayers, setFilteredSlatePlayers] = useState<
    (SlatePlayerEntity & TeamGameAttributes)[]
  >([]);

  const [fetchSlate] = useLazyFetchSlateByDfsSiteBySlateIdQuery();

  const { data: lineupHeadquarterPlayers } =
    useFetchLineupHeadquarterPlayersBySportQuery({
      sport: 'nfl',
    });

  const { data: masterSlates } = useFetchMasterSlatesBySportQuery({
    site,
    sport: 'nfl',
  });

  const [fetchGameAttributes] = useLazyFetchGameAttributesQuery();

  function handleStatGroupChange(statgroup: string) {
    const filteredSlateData = slatePlayerListWithGameAttributes?.filter(
      slate => {
        if (statgroup === '') return true;

        return slate.stat_group === statgroup;
      }
    );

    setSelectedStatGroup(statgroup as string);
    setFilteredSlatePlayers(filteredSlateData ?? []);
  }

  function handleTeamChange(team: string) {
    const filteredSlateData = slatePlayerListWithGameAttributes?.filter(
      slate => {
        if (team === '') return true;

        return slate.player.team_id === team;
      }
    );

    setSelectedTeam(team as string);
    setFilteredSlatePlayers(filteredSlateData ?? []);
  }

  function handleSearchChange(searchTerm: string) {
    const filteredSlateData = slatePlayerListWithGameAttributes?.filter(
      slate => {
        if (searchTerm == '') return true;

        const firstNameMatch = slate.player.first_name
          .trim()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const lastNameMatch = slate.player.last_name
          .trim()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        return firstNameMatch || lastNameMatch;
      }
    );
    setFilteredSlatePlayers(filteredSlateData ?? []);
  }

  async function onSlateSelection(slateId: string) {
    await fetchSlate({ site, slateId });
    await fetchGameAttributes({ site, slateId });
  }

  const columns: TypeColumn[] = [
    {
      name: 'name',
      header: 'Name',
      minWidth: 250,
      defaultFlex: 1,
      render: ({
        data,
      }: {
        data: SlatePlayerEntity & { teamData: TeamGameAttributes };
      }) => (
        <Typography variant="h5">
          {data?.player.first_name} {data?.player.last_name}
        </Typography>
      ),
    },
    {
      name: 'salary',
      header: 'Salary',
      defaultFlex: 1,
      type: 'number',
      render: ({
        data,
      }: {
        data: SlatePlayerEntity & { teamData: TeamGameAttributes };
      }) => data.schedule.salaries[0].salary,
    },
  ];

  return (
    <Box marginTop={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {masterSlates?.map(slate => {
            if (slate.type === 'classic') {
              return (
                <ListItemButton
                  key={slate.importId}
                  onClick={() => onSlateSelection(slate.importId)}
                >
                  <ListItemText primary={slate.name} secondary={slate.type} />
                </ListItemButton>
              );
            }
          })}
        </Grid>

        <Grid item xs={12}>
          {highestValueTeams.map(team => (
            <Typography key={team.teamName}>
              {team.teamName} - {team.value.toFixed(2)}
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12}>
          <IconButton onClick={handleDialogOpen}>
            <FilterList />
          </IconButton>
          <ReactDataGrid columns={columns} dataSource={filteredPlayers} />
        </Grid>
        <Grid item xs={12}>
          <Dialog fullWidth open={dialogOpen}>
            <DialogContent>
              <PlayerTableFilter
                selectedTeam={selectedTeam}
                teamList={slatePlayerTeamList}
                selectedStatGroup={selectedStatGroup}
                statGroupList={slateStatGroupList}
                onSearchChange={handleSearchChange}
                onStatGroupChange={handleStatGroupChange}
                onTeamChange={handleTeamChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}

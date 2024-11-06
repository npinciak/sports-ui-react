import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchLineupHeadquarterPlayersBySportQuery } from '../../handlers/lineup-hq.handler';
import { useFetchMasterSlatesBySportQuery } from '../../handlers/master-slate.handler';
import { useLazyFetchSlateByDfsSiteBySlateIdQuery } from '../../handlers/slate-player.handler';
import { DFS_SITES } from '../../models/dfs-site.model';
import {
  getSlatePlayerListWithGameAttributes,
  getTeamsWithHighestValue,
  getUniqueSlatePlayerStatGroupList,
  getUniqueSlatePlayerTeamList,
} from '../../selectors/slate-player.selector';
import { PlayerTableFilter } from '../components/player-filter.component';
import { useLazyFetchGameAttributesQuery } from '../handlers/game-attributes.handler';
import { NFL_TEAM_ID_TO_ABBREV_MAP } from '../models';

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

  const [filteredPlayers, setFilteredSlatePlayers] = useState<unknown[]>([]);

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

  const columns: GridColDef<
    (typeof slatePlayerListWithGameAttributes)[number]
  >[] = [
    {
      field: 'name',
      headerName: 'name',
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.player.first_name || ''} ${row.player.last_name || ''}`,
    },
    {
      field: 'team',
      headerName: 'team',
      sortable: true,
      valueGetter: (value, row) =>
        NFL_TEAM_ID_TO_ABBREV_MAP[row.player.team_id],
    },
    {
      field: 'stat_group',
      headerName: 'Pos',
      sortable: true,
      valueGetter: (value, row) => row.stat_group,
    },

    {
      field: 'salary',
      headerName: 'sal',
      sortable: true,
      valueGetter: (value, row) => row.schedule.salaries[0].salary,
    },
    {
      field: 'valueTargetGPPs',
      headerName: 'GPP Value',
      sortable: true,
    },
    {
      field: 'targetValueDiffGPPs',
      headerName: 'GPP Value Diff',
      sortable: true,
    },
  ];

  return (
    <Box marginTop={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
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
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            {highestValueTeams.map(team => (
              <ListItem>
                <Typography key={team.teamName}>
                  {team.teamName} - {team.value.toFixed(2)}
                </Typography>
              </ListItem>
            ))}
          </Card>
        </Grid>

        <Grid item xs={12}>
          <DataGrid
            rows={slatePlayerListWithGameAttributes}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50]}
          />
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

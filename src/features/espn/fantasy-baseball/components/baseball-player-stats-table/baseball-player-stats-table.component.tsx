import Grid from '@mui/material/Grid2';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { FangraphsPlayerStatEntity } from '@shared/fangraphs';

interface BaseballPlayerStatsTableProps {
  data: FangraphsPlayerStatEntity[];
  basicStatsColumns: GridColDef[];
  isLoading?: boolean;
}

export function BaseballPlayerStatsTable({
  data,
  basicStatsColumns,
  isLoading = false,
}: BaseballPlayerStatsTableProps) {
  return (
    <>
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <DataGrid
            getRowId={row => row.playerid}
            rows={data}
            columns={basicStatsColumns}
            sx={{ border: 0 }}
            disableColumnMenu={true}
            hideFooterPagination={true}
            loading={isLoading}
          />
        </Grid>
      </Grid>
    </>
  );
}

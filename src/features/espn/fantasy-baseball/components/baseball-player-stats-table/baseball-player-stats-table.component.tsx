import {
  TypeColumn,
  TypeSortInfo,
} from '@inovua/reactdatagrid-community/types';
import { FangraphsPlayerStatEntity } from '@shared/fangraphs';
import { BASEBALL_PLAYER_STATS_TABLE_COLUMNS } from './baseball-player-stats-table.model';

export function BaseballPlayerStatsTable({
  data,
}: {
  data: FangraphsPlayerStatEntity[];
}) {
  const defaultSortInfo: TypeSortInfo = [];

  const columns: TypeColumn[] = BASEBALL_PLAYER_STATS_TABLE_COLUMNS;

  const gridStyle = { minHeight: 500 };
  return <></>;
}

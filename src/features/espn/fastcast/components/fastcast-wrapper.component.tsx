import { Button, NativeSelect, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EspnClientV2 } from '../../client/espn-v2.client';
import { FastcastClient } from '../client/fastcast.client';
import { wsConnect, wsDisconnect } from '../helpers/websocket-handler';
import { WebSocketUriBuilder } from '../models/websocket-uri-builder.model';
import { selectEventEntityListByLeague } from '../selector/fastcast-event.selectors';
import { selectLeagueEntityList } from '../selector/fastcast-league.selectors';
import { FastcastEventComponent } from './fastcast-event.component';

export function FastcastWrapperComponent() {
  const dispatch = useDispatch();

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [leagueFilter, setLeagueFilter] = useState<string>('');

  EspnClientV2.useGetStaticScoreboardQuery();

  const [getConnectionInfo] =
    FastcastClient.useLazyGetFastCastWebsocketConnectionInfoQuery();

  const [connectToFastCast] = FastcastClient.useLazyGetFastcastQuery();

  const leagueList = useSelector(selectLeagueEntityList);

  const eventListByLeague = useSelector(selectEventEntityListByLeague)(
    leagueFilter
  );

  async function onConnectionClick(newConnectionStatus: any) {
    setIsConnected(!!newConnectionStatus);

    const websocketConnectionInfo = await getConnectionInfo().unwrap();

    const { websocketUri } = WebSocketUriBuilder({
      websocketConnectionInfo,
    });

    dispatch(wsConnect(websocketUri));
  }

  const onDisconnectClick = () => {
    dispatch(wsDisconnect());
  };

  return (
    <>
      <Grid container spacing={2} className="mb-4">
        <Grid size={12}>
          <Button
            variant="contained"
            className="w-full"
            onClick={() => onConnectionClick(!isConnected)}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </Grid>

        <Grid size={12}>
          <NativeSelect
            value={leagueFilter}
            onChange={event => setLeagueFilter(event.target.value)}
            className="w-full"
          >
            <option value="">All</option>
            {leagueList?.map(league => (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            ))}
          </NativeSelect>
        </Grid>
      </Grid>
      <Stack width="100%">
        {eventListByLeague?.map(event => (
          <FastcastEventComponent key={event.id} event={event} />
        ))}
      </Stack>
    </>
  );
}

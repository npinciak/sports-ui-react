import { Button, Card, CardContent, Divider, Grid } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FastcastStaticClient } from '../client/fastcast-static.client';
import { FastcastClient } from '../client/fastcast.client';
import { FastcastWebSocketHandler } from '../helpers/websocket.handler';
import { WebSocketUriBuilder } from '../models/websocket-uri-builder.model';
import {
  selectEventEntityList,
  selecttEventEntityListBySport,
} from '../selector/fastcast-event.selectors';
import { selectSportEntityList } from '../selector/fastcast-sport.selectors';
import { FastcastEventComponent } from './fastcast-event.component';

export function FastcastWrapperComponent() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [sportFilter, setSportFilter] = useState<string>('20');

  FastcastStaticClient.useGetStaticScoreboardQuery();

  const [getConnectionInfo] =
    FastcastClient.useLazyGetFastCastWebsocketConnectionInfoQuery();

  const [connectToFastCast] = FastcastClient.useLazyGetFastcastQuery();

  const sportList = useSelector(selectSportEntityList);
  const eventList = useSelector(selectEventEntityList);
  const eventListBySport = useSelector(selecttEventEntityListBySport);

  const fastcastWebsocket = FastcastWebSocketHandler();

  async function onConnectionClick() {
    const { data } = await getConnectionInfo();
    const { websocketUri } = WebSocketUriBuilder({
      websocketConnectionInfo: data,
    });

    fastcastWebsocket.websocket = websocketUri;

    fastcastWebsocket.openConnection();
    fastcastWebsocket.listenToMessages(connectToFastCast);
  }

  const onDisconnectClick = () => {
    fastcastWebsocket.disconnect();
  };

  const handleSportSelection = (value: string) => {
    setSportFilter(value);
  };

  return (
    <>
      <Button onClick={onConnectionClick}>Connect</Button>
      <Button onClick={onDisconnectClick}>Disconnect</Button>

      {eventListBySport?.map(event => <FastcastEventComponent event={event} />)}
    </>
  );
}

import { FilterList } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fastcastURIBuilder } from '../../constants';
import { FastcastStaticClient } from '../client/fastcast-static.client';
import { FastcastClient } from '../client/fastcast.client';
import {
  FASTCAST_EVENT_TYPE,
  OPERATION_CODE,
  WebSocketMessage,
} from '../models';
import { WebSocketUriBuilder } from '../models/websocket-uri-builder.model';
import {
  selectEventEntityList,
  selecttEventEntityListBySport,
} from '../selector/fastcast-event.selectors';
import { selectSportEntityList } from '../selector/fastcast-sport.selectors';
import { fastcastEventSummary } from '../transformers/espn-fastcast.transformers';
import { FastcastTeamComponent } from './fastcast-team.component';

export function FastcastWrapperComponent() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [sportFilter, setSportFilter] = useState<string>('20');

  const { data: fastcastdata } =
    FastcastStaticClient.useGetStaticScoreboardQuery();
  console.log(fastcastdata);

  const [getConnectionInfo] =
    FastcastClient.useLazyGetFastCastWebsocketConnectionInfoQuery();

  const [connectToFastCast, { data }] =
    FastcastClient.useLazyGetFastcastQuery();

  const sportList = useSelector(selectSportEntityList);
  const eventList = useSelector(selectEventEntityList);
  const eventListBySport = useSelector(selecttEventEntityListBySport);

  async function onConnectionClick() {
    const { data } = await getConnectionInfo();
    const { websocketUri } = WebSocketUriBuilder({
      websocketConnectionInfo: data,
    });

    const eventType = FASTCAST_EVENT_TYPE.TOP_EVENTS;

    const web = new WebSocket(websocketUri ?? '');

    web.onopen = () => {
      web.send(JSON.stringify({ op: OPERATION_CODE.CONNECT }));
    };

    web.onmessage = event => {
      const { op, sid, mid, pl, rc } = JSON.parse(
        event.data
      ) as WebSocketMessage;

      switch (op) {
        case OPERATION_CODE.B:
          break;
        case OPERATION_CODE.CONNECT: {
          const message = { op: OPERATION_CODE.SUCCESS, sid, tc: eventType! };
          web.send(JSON.stringify(message));
          break;
        }
        case OPERATION_CODE.PING:
          //   if (rc === 403) {
          //     web.close();
          //   }
          const message = {
            op: OPERATION_CODE.PING,
            sid,
            pl,
            tc: eventType,
            mid,
          };
          // web.send(JSON.stringify(message));

          break;
        case OPERATION_CODE.HEARTBEAT: {
          connectToFastCast({ url: pl });
          break;
        }
        case OPERATION_CODE.INIT: {
          const uri = fastcastURIBuilder(eventType, mid);
          connectToFastCast({ url: uri });
          break;
        }
        case OPERATION_CODE.RECONNECT: {
          // web.close();
          break;
        }
        case OPERATION_CODE.Error:
          web.close();
          break;
        default:
          break;
      }
    };
  }

  function navigationClick(eventId: string | undefined) {
    if (!eventId) return;
    navigate(`/fastcast/${eventId}`);
  }

  function handleSportSelection(value: string) {
    setSportFilter(value);
  }

  return (
    <>
      <Button onClick={onConnectionClick}>Connect</Button>
      {/* <FastcastSportFilterComponent
        sportList={sportList}
        handleSportSelection={handleSportSelection}
      /> */}
      <IconButton
        color="primary"
        aria-label="add an alarm"
        onClick={toggleDrawer(true)}
      >
        <FilterList />
      </IconButton>{' '}
      {eventListBySport(sportFilter)?.map(event => (
        <>
          <div className="mb-4 w-full" key={event.uid}>
            <Card sx={{ borderRadius: '20px' }}>
              <CardContent>
                <Grid
                  container
                  className="w-full mb-2 text-xs font-semibold truncate"
                >
                  {fastcastEventSummary(event)}
                </Grid>
                <Grid container className="w-full mb-2">
                  <FastcastTeamComponent team={event.teams?.away} />
                  <Divider />
                  <FastcastTeamComponent team={event.teams?.home} />
                </Grid>
              </CardContent>
            </Card>
          </div>
        </>
      ))}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, padding: '16px' }}
          role="presentation"
          // onClick={toggleDrawer(false)}
        >
          <h2>Live</h2>
          <Switch defaultChecked /> <h2>Filter by Sport</h2>
          <Select
            value={sportFilter}
            onChange={e => handleSportSelection(e.target.value)}
            sx={{ width: '100%' }}
          >
            {sportList.map(sport => (
              <MenuItem key={sport.id} value={sport.id}>
                {sport.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Drawer>
    </>
  );
}

import { Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { fastcastURIBuilder } from '../../constants/espn.const';
import { FastcastClient } from '../client/fastcast.client';
import { FASTCAST_EVENT_TYPE, FastcastEventType, OPERATION_CODE, WebSocketMessage } from '../models';

export const fastcastWebSocketMiddleware: Middleware = (api: MiddlewareAPI<Dispatch<any>>) => next => action => {
  let _websocket: WebSocket | null = null;
  let _sessionId: string | null = null;

  const _eventType: FastcastEventType | null = FASTCAST_EVENT_TYPE.TOP_EVENTS;

  const onOpen = (api: MiddlewareAPI) => (event: any) => {
    (_websocket as WebSocket)!.send(JSON.stringify({ op: OPERATION_CODE.CONNECT }));
  };

  const onClose = (api: MiddlewareAPI) => () => {
    api.dispatch(wsDisconnected());
  };

  const onMessage = (api: MiddlewareAPI) => (action: MessageEvent<string>) => {
    const { op, sid, mid, pl } = JSON.parse(action.data) as WebSocketMessage;

    switch (op) {
      case OPERATION_CODE.CONNECT:
        (_websocket as WebSocket)!.send(JSON.stringify({ op: OPERATION_CODE.SUCCESS, sid, tc: _eventType }));
        break;
      case OPERATION_CODE.HEARTBEAT:
        const heartbeatAction = FastcastClient.endpoints.getFastcast.initiate({ url: pl });

        api.dispatch(heartbeatAction);
        break;
      case OPERATION_CODE.INIT:
        const url = fastcastURIBuilder(_eventType, mid);

        const initAction = FastcastClient.endpoints.getFastcast.initiate({ url });
        api.dispatch(initAction);
        break;
      default:
        break;
    }
  };

  switch (action.type) {
    case ACTIONS.WS_CONNECT:
      if (_websocket != null) (_websocket as WebSocket).close();

      _websocket = new WebSocket((action as { payload: { host: string } }).payload.host);

      _websocket.onmessage = onMessage(api);
      _websocket.onclose = onClose(api);
      _websocket.onopen = onOpen(api);
      _websocket.onmessage = onMessage(api);

      break;
    case ACTIONS.WS_CONNECTED:
      // if (_websocket == null) return;

      (_websocket as unknown as WebSocket)!.send(JSON.stringify({ op: OPERATION_CODE.CONNECT }));

      break;
    case ACTIONS.WS_DISCONNECT:
      (_websocket as unknown as WebSocket).send(JSON.stringify({ op: OPERATION_CODE.U, sid: _sessionId, tc: _eventType }));

      // if (_websocket != null) {
      //   (_websocket as WebSocket).close();
      // }
      // _websocket = null;
      // console.log('websocket closed');
      break;
    default:
      return next(action);
  }

  return next(action);
};

const ACTIONS = {
  WS_CONNECT: 'WS_CONNECT',
  WS_CONNECTING: 'WS_CONNECTING',
  WS_CONNECTED: 'WS_CONNECTED',
  WS_DISCONNECT: 'WS_DISCONNECT',
  WS_DISCONNECTED: 'WS_DISCONNECTED',
};

export const wsConnect = (host: string) => ({ type: ACTIONS.WS_CONNECT, payload: { host } });

export const wsConnecting = (host: string) => ({ type: ACTIONS.WS_CONNECTING, payload: { host } });
export const wsConnected = (host: string) => ({ type: ACTIONS.WS_CONNECTED, payload: { host } });
export const wsDisconnect = () => ({ type: ACTIONS.WS_DISCONNECT });
export const wsDisconnected = () => ({ type: ACTIONS.WS_DISCONNECTED });

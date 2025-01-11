import { fastcastURIBuilder } from '../../constants';
import { FASTCAST_EVENT_TYPE, FastcastEventType } from '../models';
import { OPERATION_CODE, WebSocketMessage } from '../models/websocket.model';

export function FastcastWebSocketHandler() {
  return class FastcastWebSocketHandlerClass {
    private static _websocket: WebSocket | null = null;
    private static _eventType: FastcastEventType | null = FASTCAST_EVENT_TYPE.TOP_EVENTS;

    static set websocket(url: string | null) {
      if (!url) throw new Error('Invalid URL');
      this._websocket = new WebSocket(url);
    }

    static handleWebSocketMessage(event: MessageEvent<string>, fetchData: (args: { url: string }) => void) {
      const { op, sid, mid, pl } = JSON.parse(event.data) as WebSocketMessage;

      switch (op) {
        case OPERATION_CODE.CONNECT:
          this.sendWebSocketMessage({ op: OPERATION_CODE.SUCCESS, sid, tc: this._eventType });
          break;
        case OPERATION_CODE.HEARTBEAT:
          fetchData({ url: pl });
          break;
        case OPERATION_CODE.INIT:
          const uri = fastcastURIBuilder(this._eventType, mid);
          fetchData({ url: uri });
          break;
        default:
          break;
      }
    }

    static listenToMessages(connectToFastCast: (args: { url: string }) => void) {
      if (!this._websocket) throw new Error('No websocket connection');

      this._websocket.onmessage = event => {
        this.handleWebSocketMessage(event, connectToFastCast);
      };
    }

    static sendWebSocketMessage(message: unknown) {
      if (!this._websocket) throw new Error('No websocket connection');

      this._websocket.send(JSON.stringify(message));
    }

    static openConnection() {
      if (!this._websocket) throw new Error('No websocket connection');
      this._websocket.onopen = () => {
        if (!this._websocket) throw new Error('No websocket connection');

        this._websocket.send(JSON.stringify({ op: OPERATION_CODE.CONNECT }));
      };
    }

    static disconnect() {
      if (!this._websocket) throw new Error('No websocket connection');
      this._websocket.close();
    }
  };
}

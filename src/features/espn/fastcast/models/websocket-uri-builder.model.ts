import { FASTCAST_SERVICE_URI } from '../../constants/espn.const';
import { WebSocketConnectionInfo } from './websocket.model';

export function WebSocketUriBuilder({ websocketConnectionInfo }: { websocketConnectionInfo: WebSocketConnectionInfo | undefined }) {
  return class WebSocketUriBuilderClass {
    private static _protocol = 'wss://';
    private static _path = FASTCAST_SERVICE_URI;

    static get websocketUri() {
      if (!websocketConnectionInfo) throw Error('No websocket connection info');

      return `${this._protocolIpPort}${this._path}?${this._params}`;
    }

    private static get _params() {
      if (!websocketConnectionInfo) throw Error('No websocket connection info');

      return `TrafficManager-Token=${websocketConnectionInfo.token}`;
    }

    private static get _protocolIpPort() {
      if (!websocketConnectionInfo) throw Error('No websocket connection info');
      return `${this._protocol}${websocketConnectionInfo?.ip}:${websocketConnectionInfo?.securePort}`;
    }
  };
}

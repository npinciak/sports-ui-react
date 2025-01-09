import { WebSocketConnectionInfo } from './websocket.model';

export function WebSocketUriBuilder({ websocketConnectionInfo }: { websocketConnectionInfo: WebSocketConnectionInfo | undefined }) {
  return class WebSocketUriBuilderClass {
    private static _protocol = 'wss://';
    private static _path = '/FastcastService/pubsub/profiles/12000';

    static get websocketUri() {
      if (!websocketConnectionInfo) return null;

      return `${this._protocolIpPort}${this._path}?${this._params}`;
    }

    private static get _params() {
      if (!websocketConnectionInfo) return null;

      return `TrafficManager-Token=${websocketConnectionInfo?.token}`;
    }

    private static get _protocolIpPort() {
      if (!websocketConnectionInfo) return null;
      return `${this._protocol}${websocketConnectionInfo?.ip}:${websocketConnectionInfo?.securePort}`;
    }
  };
}

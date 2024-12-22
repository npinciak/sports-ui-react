export const OPERATION_CODE = {
  B: 'B',
  CONNECT: 'C',
  HEARTBEAT: 'H',
  SUCCESS: 'S',
  RECONNECT: 'R',
  PING: 'P',
  INIT: 'I',
  Replace: 'Replace',
  Error: 'ERROR',
} as const;

export type OperationCode = (typeof OPERATION_CODE)[keyof typeof OPERATION_CODE];

export type WebSocketMessage = {
  /**
   * Heartbeat interval
   */
  hbi: number;
  /**
   * Operation code
   */
  op: OperationCode;
  /**
   * Response code
   */
  rc: number;
  /**
   * Session ID
   */
  sid: string;
  /**
   * Payload
   */
  pl: string;
  tc: string;
  /**
   * Timestamp
   */
  ts: number;
  /**
   * Use CDN
   */
  useCDN: boolean;
  /**
   * Edge URL
   */
  edgeUrl: string;
  '~c': number;
  /**
   * Message ID
   */
  mid?: string;
  oat: unknown;
  /**
   * Type
   */
  tp: unknown;
  /**
   * Message
   */
  msg: string;
  lt: boolean;
};

export interface WebSocketConnectionInfo {
  ip: string;
  token: string;
  port: number;
  securePort: number;
}

export type SocketRes = Partial<WebSocketMessage>;
export type SocketResSuccess = Pick<WebSocketMessage, 'mid' | 'op' | 'pl' | 'tc' | 'useCDN'>;
export type SocketMsg = Pick<WebSocketMessage, 'sid' | 'tc'> & { op: OperationCode };
export type OpCodePRes = Pick<WebSocketMessage, 'ts' | '~c' | 'pl'>;

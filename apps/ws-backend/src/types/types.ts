import { WebSocket } from "ws";

export interface UserSocket {
  userId: string;
  rooms: string[];
  socket: WebSocket;
}

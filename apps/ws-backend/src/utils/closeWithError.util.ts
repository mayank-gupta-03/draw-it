import { WebSocket } from "ws";

const closeWithError = (ws: WebSocket, code?: number, reason?: string) => {
  const errorCode = code || 1011;
  const errorMessage = reason || "Internal server error.";
  ws.close(errorCode, errorMessage);
  console.error(`[ERROR] CODE: ${errorCode} MESSAGE: ${errorMessage}`);
};

export default closeWithError;

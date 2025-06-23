import { WebSocket } from "ws";

class ExtendedWebSocket extends WebSocket {
  userId: string | null;
  constructor(socket, request) {
    super(socket, request);
    this.userId = null;
  }

  closeWithError(code?: number, reason?: string) {
    const errorCode = code || 1011;
    const errorMessage = reason || "Internal server error.";
    console.error(`[ERROR] CODE: ${errorCode} MESSAGE: ${errorMessage}`);
    this.close(errorCode, errorMessage);
  }
}

export { ExtendedWebSocket };

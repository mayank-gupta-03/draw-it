import { WebSocket, ClientOptions } from "ws";
import { ClientRequestArgs } from "http";

class ExtendedWebSocket extends WebSocket {
  userId: string | null;
  constructor(
    address: string | URL,
    protocols?: string | string[],
    options?: ClientOptions | ClientRequestArgs
  ) {
    if (protocols !== undefined && options !== undefined) {
      super(address, protocols, options);
    } else if (protocols !== undefined) {
      super(address, protocols);
    } else {
      super(address);
    }

    this.userId = null;
  }

  closeWithError(code: number, reason?: string) {
    const errorCode = code || 1011;
    const errorMessage = reason || "Internal server error.";
    console.error(`[ERROR] CODE: ${errorCode} MESSAGE: ${errorMessage}`);
    this.close(errorCode, errorMessage);
  }
}

export default ExtendedWebSocket;

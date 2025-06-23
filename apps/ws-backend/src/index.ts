import { WebSocketServer } from "ws";
import "dotenv/config";
import getQueryParams from "./utils/getQueryParams.util";
import { PORT } from "./utils/config.util";
import validateToken from "./utils/validateToken.util";
import { ExtendedWebSocket } from "./types/types";

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", function connection(ws: ExtendedWebSocket, request) {
  if (!request.url) {
    ws.closeWithError(1008, "Missing URL");
    return;
  }

  const token = getQueryParams("token", request.url);

  if (!token) {
    ws.closeWithError(1008, "Invalid URL. No authorization token found.");
    return;
  }

  const userId = validateToken(token);

  if (!userId) {
    ws.closeWithError(1008, "Authorization header malformed or missing.");
    return;
  }

  ws.userId = userId;

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
});

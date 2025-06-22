import { WebSocketServer } from "ws";
import "dotenv/config";
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/config";
import closeWithError from "./utils/closeWithError.util";

const PORT = Number(process.env.PORT) || 8001;

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", function connection(ws, request) {
  if (!request.url || !JWT_SECRET) {
    closeWithError(ws, 1008, "Missing URL");
    return;
  }
  const url = new URL(request.url, `ws://localhost:${PORT}`);
  const token = url.searchParams.get("token");
  if (!token) {
    closeWithError(ws, 1008, "Missing authorization token.");
    return;
  }
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  if (!decoded.userId) {
    closeWithError(ws, 1008, "Invalid token payload.");
    return;
  }
  const userId = decoded.userId;

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
});

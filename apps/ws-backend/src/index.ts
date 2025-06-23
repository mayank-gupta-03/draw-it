import { WebSocketServer } from "ws";
import "dotenv/config";
import getQueryParams from "./utils/getQueryParams.util";
import { PORT } from "./utils/config.util";
import validateToken from "./utils/validateToken.util";
import ExtendedWebSocket from "./utils/ExtendedWebSocket.util";
import { UserSocket } from "./types/types";
import { prisma } from "@repo/db/client";
import { ParsedSocketMessage } from "@repo/common/types";

const wss = new WebSocketServer({ port: PORT });

const users: UserSocket[] = [];

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

  ws.userId = validateToken(token);

  if (!ws.userId) {
    ws.closeWithError(1008, "Authorization header missing or malformed.");
    return;
  }

  if (!users.find((user) => user.socket === ws))
    users.push({ userId: ws.userId!, socket: ws, rooms: [] });

  ws.on("message", async function message(data) {
    let parsedMessage: ParsedSocketMessage;

    try {
      parsedMessage = JSON.parse(data.toString());
    } catch (err) {
      console.error("Error: ", err);
      ws.closeWithError(1007, "Invalid JSON message received.");
      return;
    }

    // const { roomId, type, message } = parsedMessage;

    const user = users.find((user) => user.socket === ws);

    if (!user) {
      ws.closeWithError(1008, "No user associated with this socket.");
      return;
    }

    if (parsedMessage.type === "JOIN") {
      const { roomId } = parsedMessage;
      if (!roomId) {
        console.error(`Missing roomId in JOIN message.`);
        return;
      }

      let room;

      try {
        room = await prisma.rooms.findUnique({
          where: { id: roomId },
        });
      } catch (err) {
        console.error("Error: ", err);
        ws.closeWithError(1011, "Internal server error.");
        return;
      }

      if (!room) {
        console.error(`No room with id ${roomId} exists.`);
        return;
      }

      if (!user.rooms.includes(roomId)) {
        user.rooms.push(roomId);
        console.log(`${user.userId} has joined room with id ${roomId}`);
      } else {
        console.log(`${user.userId} is already in a room with id ${roomId}`);
      }
    } else if (parsedMessage.type === "LEAVE") {
      const { roomId } = parsedMessage;
      if (!roomId) {
        console.error(`Missing slug in LEAVE message.`);
        return;
      }
      if (user.rooms.includes(roomId)) {
        user.rooms = user.rooms.filter((room) => room !== roomId);
      }
    } else if (parsedMessage.type === "CHAT") {
      const { message, roomId } = parsedMessage;
      try {
        await prisma.chats.create({
          data: { message, userId: ws.userId!, roomId },
        });

        users.forEach((user) => {
          if (user.rooms.includes(roomId)) {
            user.socket.send(message as string);
          }
        });
      } catch (err) {
        console.error("Internal server error.", err);
        return;
      }
    }
  });
});

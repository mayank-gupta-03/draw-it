"use client";

import { useEffect, useState } from "react";
import { useGetChats } from "../hooks/useChat";
import { useGetRoom } from "../hooks/useRoom";
import useSocket from "../hooks/useSocket";
import { Chats } from "@repo/common/api-types";
import Spinner from "./Spinner";

interface Props {
  slug: string;
}
const Chat = ({ slug }: Props) => {
  const { data: room, isPending: isRoom } = useGetRoom(slug);
  const { data: chats, isPending: isChats } = useGetChats(room?.data.id || "");
  const [messages, setMessages] = useState<Chats[]>([]);
  const [socket, isSocketLoading] = useSocket();

  const isLoading = isRoom || isChats || isSocketLoading;

  useEffect(() => {
    if (chats) setMessages(chats?.data);
    if (socket && !isSocketLoading) {
      socket.send(
        JSON.stringify({
          type: "JOIN",
          roomId: room?.data.id,
        })
      );
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "CHAT") {
          setMessages((message) => [...message, parsedData.message]);
        }
      };
    }
  }, [socket, isSocketLoading, room?.data.id, chats]);
  return (
    <>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div>
          {messages.map((message, idx) => (
            <p key={idx}>{message.message}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default Chat;

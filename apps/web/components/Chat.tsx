"use client";

import { useEffect } from "react";
import { useGetChats } from "../hooks/useChat";
import { useGetRoom } from "../hooks/useRoom";
import useSocket from "../hooks/useSocket";

interface Props {
  slug: string;
}
const Chat = ({ slug }: Props) => {
  const { data: room, isPending: isRoom } = useGetRoom(slug);
  const { data: chats, isPending: isChats } = useGetChats(room?.data.id || "");
  const [socket, isSocketLoading] = useSocket();

  useEffect(() => {
    if (socket && !isSocketLoading) {
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "CHAT") {
        }
      };
    }
  }, [socket, isSocketLoading]);
  return <div></div>;
};

export default Chat;

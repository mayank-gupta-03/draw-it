import { WS_URL } from "@repo/common/config";
import { useEffect, useState } from "react";

const useSocket = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      setIsLoading(false);
      setSocket(ws);
    };
  }, []);
  return [socket, isLoading] as const;
};
export default useSocket;

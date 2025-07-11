import { WS_URL } from "@repo/common/config";
import { useEffect, useState } from "react";

const useSocket = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<WebSocket>();
  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWM4bG9pdjAwMDAwdWt5bTM3NTUwNnh5IiwiaWF0IjoxNzUyMjQ5NDI3fQ.O9PIWA69GetMfQUMi2OAgTNPDZpIQFtGiQdVLhvlmCU`
    );
    ws.onopen = () => {
      setIsLoading(false);
      setSocket(ws);
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };
  }, []);
  return [socket, isLoading] as const;
};
export default useSocket;

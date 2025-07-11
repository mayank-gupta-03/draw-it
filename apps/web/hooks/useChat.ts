import { useQuery } from "@tanstack/react-query";
import { getChats } from "../apiClient/apiClient";

export const useGetChats = (roomId: string) => {
  return useQuery({
    queryKey: ["chats", roomId],
    queryFn: () => getChats(roomId),
    enabled: !!roomId,
  });
};

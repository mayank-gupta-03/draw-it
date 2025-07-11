import { useMutation, useQuery } from "@tanstack/react-query";
import { getRoom, joinRoom } from "../apiClient/apiClient";

export const useJoinRoom = () => {
  return useMutation({
    mutationFn: joinRoom,
  });
};

export const useGetRoom = (slug: string) => {
  return useQuery({
    queryKey: ["room", slug],
    queryFn: () => getRoom(slug),
    enabled: !!slug,
  });
};

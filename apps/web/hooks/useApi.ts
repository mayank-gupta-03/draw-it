import { useMutation, useQuery } from "@tanstack/react-query";
import { createRoom, getChats, joinRoom } from "../api-client/apiClient";
import { CreateRoomResponseBody } from "@repo/common/api-types";
import { useRouter } from "next/navigation";

export const useCreateRoom = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: createRoom,
    onSuccess: (values: CreateRoomResponseBody) =>
      router.push(`${values.data.slug}`),
  });
};

export const useGetRoom = (slug: string) => {
  const params = { slug };
  return useQuery({
    queryKey: ["getRoom", slug],
    queryFn: () => joinRoom(params),
    enabled: !!slug,
  });
};

export const useGetChats = (roomId: string) => {
  const params = { roomId };
  return useQuery({
    queryKey: ["chats"],
    queryFn: () => getChats(params),
    enabled: !!roomId,
  });
};

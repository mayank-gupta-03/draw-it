import {
  CreateRoomRequestBody,
  CreateRoomResponseBody,
  GetChatsParamsBody,
  GetChatsResponseBody,
  GetRoomRequestBody,
  JoinRoomResponseBody,
} from "@repo/common/api-types";
import axiosInstance from "./axiosInstance";

export const createRoom = async (
  body: CreateRoomRequestBody
): Promise<CreateRoomResponseBody> => {
  const response = await axiosInstance.post("/rooms/create", body);
  return response.data;
};

export const joinRoom = async (
  body: GetRoomRequestBody
): Promise<JoinRoomResponseBody> => {
  const response = await axiosInstance.post("/rooms/get", body);
  return response.data;
};

export const getChats = async (
  params: GetChatsParamsBody
): Promise<GetChatsResponseBody> => {
  const response = await axiosInstance.get(`/chats/${params.roomId}`);
  return response.data;
};

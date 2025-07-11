import {
  CreateUserRequestBody,
  GetRoomResponseBody,
  JoinRoomRequestBody,
  JoinRoomResponseBody,
  LoginUserRequestBody,
  LoginUserResponseBody,
  RegisterUserResponseBody,
} from "@repo/common/api-types";
import axiosInstance from "../utils/axiosInstance";

export const createUser = async (
  body: CreateUserRequestBody
): Promise<RegisterUserResponseBody> => {
  const response = await axiosInstance.post("/users/register", body);
  return response.data;
};

export const loginUser = async (
  body: LoginUserRequestBody
): Promise<LoginUserResponseBody> => {
  const response = await axiosInstance.post("/users/login", body);
  return response.data;
};

export const joinRoom = async (
  body: JoinRoomRequestBody
): Promise<JoinRoomResponseBody> => {
  const response = await axiosInstance.post("/rooms/join", body);
  return response.data;
};

export const getRoom = async (slug: string): Promise<GetRoomResponseBody> => {
  const response = await axiosInstance.get(`/rooms/${slug}`);
  return response.data;
};

export const getChats = async (roomId: string) => {
  const response = await axiosInstance.get(`/chats/${roomId}`);
  return response.data;
};

import {
  CreateRoomRequestBody,
  GetRoomRequestBody,
} from "@repo/common/api-types";
import axiosInstance from "./axiosInstance";

export const createRoom = async (body: CreateRoomRequestBody) => {
  const response = await axiosInstance.post("/rooms/create", body);
  return response.data;
};

export const joinRoom = async (body: GetRoomRequestBody) => {
  const response = await axiosInstance.post("/rooms/get", body);
  return response.data;
};

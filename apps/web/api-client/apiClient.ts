import { CreateRoomRequestBody } from "@repo/common/api-types";
import axiosInstance from "./axiosInstance";

export const createRoom = async (slug: CreateRoomRequestBody) => {
  const response = await axiosInstance.post("/rooms", slug);
  return response.data;
};

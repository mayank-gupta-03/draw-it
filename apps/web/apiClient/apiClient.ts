import {
  CreateUserRequestBody,
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

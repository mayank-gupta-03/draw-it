import { z } from "zod";

export const LoginUserRequestBody = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(15, "Username cannot exceed 15 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const CreateUserRequestBody = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(15, "Username cannot exceed 15 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  name: z.string(),
});

export const CreateRoomRequestBody = z.object({
  slug: z
    .string()
    .min(3, "Room name must be at least 3 characters.")
    .max(15, "Room name cannot exceed 15 characters."),
});

export const DeleteRoomParamsSchema = z.object({
  roomId: z.string().min(3, "Room name must be at least 3 characters."),
});

export const GetChatsParamsSchema = z.object({
  roomId: z.string().min(3, "Room name must be at least 3 characters."),
});

export const GetRoomRequestSchema = z.object({
  slug: z
    .string()
    .min(3, "Room name must be at least 3 characters.")
    .max(15, "Room name cannot exceed 15 characters."),
});

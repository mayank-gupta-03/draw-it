import { z } from "zod";

export const LoginUserRequestSchema = z.object({
  username: z
    .string()
    .min(3, "Too short (min 3 characters)")
    .max(15, "Too long (max 15 characters)"),
  password: z.string().min(6, "Too short (min 6 characters)"),
});

export type LoginUserRequestSchema = z.infer<typeof LoginUserRequestSchema>;

export const CreateUserRequestSchema = z.object({
  username: z
    .string()
    .min(3, "Too short (min 3 characters)")
    .max(15, "Too long (max 15 characters)"),
  password: z.string().min(6, "Too short (min 6 characters)"),
  name: z.string(),
});

export type CreateUserRequestBody = z.infer<typeof CreateUserRequestSchema>;

export const CreateRoomRequestSchema = z.object({
  slug: z
    .string()
    .min(3, "Too short (min 3 characters)")
    .max(15, "Too long (max 15 characters)"),
});

export type CreateRoomRequestBody = z.infer<typeof CreateRoomRequestSchema>;

export const DeleteRoomParamsSchema = z.object({
  roomId: z.string().min(3, "Too short (min 3 characters)"),
});

export type DeleteRoomParamsBody = z.infer<typeof DeleteRoomParamsSchema>;

export const GetChatsParamsSchema = z.object({
  roomId: z.string().min(3, "Too short (min 3 characters)"),
});

export type GetChatsParamsBody = z.infer<typeof GetChatsParamsSchema>;

export const GetRoomRequestSchema = z.object({
  slug: z
    .string()
    .min(3, "Too short (min 3 characters)")
    .max(15, "Too long (max 15 characters)"),
});

export type GetRoomRequestBody = z.infer<typeof GetRoomRequestSchema>;

export interface CreateRoomResponseBody {
  success: boolean;
  data: {
    id: string;
    slug: string;
    admin: {
      id: string;
      username: string;
    };
  };
}

export interface JoinRoomResponseBody {
  success: boolean;
  data: {
    id: string;
    slug: string;
    admin: {
      id: string;
      username: string;
    };
  };
}

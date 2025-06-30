import { z } from "zod";

export const LoginUserRequestSchema = z.object({
  username: z
    .string()
    .min(3, "Too short (min 3 characters)")
    .max(15, "Too long (max 15 characters)"),
  password: z.string().min(6, "Too short (min 6 characters)"),
});

export type LoginUserRequestBody = z.infer<typeof LoginUserRequestSchema>;

export const CreateUserRequestSchema = z.object({
  username: z
    .string()
    .min(3, "Too short (min 3 characters)")
    .max(15, "Too long (max 15 characters)"),
  password: z.string().min(6, "Too short (min 6 characters)"),
  name: z.string(),
});

export type CreateUserRequestBody = z.infer<typeof CreateUserRequestSchema>;

export const JoinRoomRequestSchema = z.object({
  slug: z
    .string()
    .min(3, "Too short (min 3 characters)")
    .max(15, "Too long (max 15 characters)"),
});

export type JoinRoomRequestBody = z.infer<typeof JoinRoomRequestSchema>;

export const DeleteRoomParamsSchema = z.object({
  roomId: z.string().min(3, "Too short (min 3 characters)"),
});

export type DeleteRoomParamsBody = z.infer<typeof DeleteRoomParamsSchema>;

export const GetChatsParamsSchema = z.object({
  roomId: z.string().min(3, "Too short (min 3 characters)"),
});

export type GetChatsParamsBody = z.infer<typeof GetChatsParamsSchema>;

export const GetRoomParamsSchema = z.object({
  slug: z
    .string()
    .min(3, "Too short (min 3 characters)")
    .max(15, "Too long (max 15 characters)"),
});

export type GetRoomParamsBody = z.infer<typeof GetRoomParamsSchema>;

interface BaseResponseBody {
  success: boolean;
}

export interface CreateRoomResponseBody extends BaseResponseBody {
  data: {
    id: string;
    slug: string;
    admin: {
      id: string;
      username: string;
    };
  };
}

export interface GetRoomResponseBody extends BaseResponseBody {
  data: {
    id: string;
    slug: string;
    admin: {
      id: string;
      username: string;
    };
  };
}

export interface Chats {
  message: string;
  user: {
    id: string;
    username: string;
  };
}
export interface GetChatsResponseBody extends BaseResponseBody {
  data: Chats[];
}

export interface LoginUserResponseBody extends BaseResponseBody {
  data: {
    token: string;
  };
}

export interface RegisterUserResponseBody extends BaseResponseBody {
  data: {
    username: string;
    name: string;
  };
}

export interface JoinRoomResponseBody extends BaseResponseBody {
  data: {
    id: string;
    slug: string;
    admin: {
      id: string;
      username: string;
    };
  };
}

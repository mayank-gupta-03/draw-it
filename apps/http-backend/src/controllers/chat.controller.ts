import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util";
import { GetChatsParamsSchema } from "@repo/common/api-types";
import ApiError from "../utils/ApiError.util";
import { prisma } from "@repo/db/client";

export const getChatsByRoomId = asyncHandler(
  async (req: Request, res: Response) => {
    const reqParams = GetChatsParamsSchema.safeParse(req.params);

    if (!reqParams.success) {
      const errorMessage = reqParams.error.message;
      throw new ApiError(errorMessage, 400);
    }

    const { roomId } = reqParams.data;

    const chats = await prisma.chats.findMany({
      where: { roomId },
      select: { message: true },
      take: 50,
      orderBy: { id: "desc" },
    });

    if (!chats) res.success(204);

    res.success(200, chats);
  }
);

import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util";
import {
  CreateRoomRequestBody,
  DeleteRoomParamsSchema,
} from "@repo/common/api-types";
import ApiError from "../utils/ApiError.util";
import { prisma } from "@repo/db/client";

export const createRoom = asyncHandler(async (req: Request, res: Response) => {
  const reqBody = CreateRoomRequestBody.safeParse(req.body);

  if (!reqBody.success) {
    const errorMessage = reqBody.error.message;
    throw new ApiError(errorMessage, 400);
  }

  const { slug } = reqBody.data;
  const userId = req.userId;
  const existingRoom = await prisma.rooms.findUnique({ where: { slug } });

  if (existingRoom)
    throw new ApiError(
      "A room with same name already exists. Please use another name.",
      409
    );

  const room = await prisma.rooms.create({
    data: { slug, adminId: userId! },
    select: {
      id: true,
      slug: true,
      admin: { select: { id: true, username: true } },
    },
  });

  res.success(201, room);
});

export const deleteRoom = asyncHandler(async (req: Request, res: Response) => {
  const reqParams = DeleteRoomParamsSchema.safeParse(req.params);

  if (!reqParams.success) {
    const errorMessage = reqParams.error.message;
    throw new ApiError(errorMessage, 400);
  }

  const { roomId } = reqParams.data;

  const room = await prisma.rooms.findUnique({ where: { id: roomId } });

  if (!room) throw new ApiError("No room exists with this room id.", 404);

  await prisma.rooms.delete({ where: { id: roomId } });
  res.success(200);
});

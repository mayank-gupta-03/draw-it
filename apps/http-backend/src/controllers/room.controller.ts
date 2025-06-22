import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util";
import { CreateRoomRequestBody } from "@repo/common/types";
import ApiError from "../utils/ApiError.util";
import { prisma } from "@repo/db/client";

const createRoom = asyncHandler(async (req: Request, res: Response) => {
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
    select: { id: true, slug: true, admin: true },
  });

  res.success(201, room);
});

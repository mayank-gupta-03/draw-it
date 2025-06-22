import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util";
import {
  CreateUserRequestBody,
  LoginUserRequestBody,
} from "@repo/common/types";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.util";
import { JWT_SECRET } from "@repo/common/config";
import bcrypt from "bcryptjs";
import { prisma } from "@repo/db/client";

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  if (!JWT_SECRET)
    throw new ApiError(
      "[ERROR] FATAL: JWT_SECRET was not provided in the environment variables."
    );
  const reqBody = LoginUserRequestBody.safeParse(req.body);
  if (!reqBody.success) {
    const errorMessage = reqBody.error.message;
    throw new ApiError(errorMessage, 400);
  }
  const { username, password } = reqBody.data;
  const user = await prisma.users.findUnique({ where: { username } });
  if (!user) throw new ApiError("No user exists with this username", 404);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new ApiError("Invalid credentials", 401);
  const token = jwt.sign({ userId: username }, JWT_SECRET);
  res.success(200, { token });
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  if (!JWT_SECRET)
    throw new ApiError(
      "[ERROR] FATAL: JWT_SECRET was not provided in the environment variables."
    );
  const reqBody = CreateUserRequestBody.safeParse(req.body);
  if (!reqBody.success) {
    const errorMessage = reqBody.error.message;
    throw new ApiError(errorMessage, 400);
  }
  const { username, password, name } = reqBody.data;
  const existingUser = await prisma.users.findUnique({ where: { username } });
  if (existingUser)
    throw new ApiError("User already exists with this username.", 409);
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS) || 10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await prisma.users.create({
    data: { username, password: hashedPassword, name },
    select: { username: true, name: true },
  });
  res.success(201, user);
});

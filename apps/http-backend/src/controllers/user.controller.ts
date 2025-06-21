import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.util";
import { LoginUserRequestBody } from "@repo/common/types";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.util";
import { JWT_SECRET } from "@repo/common/config";

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
  const token = jwt.sign({ userId: username }, JWT_SECRET);
  res.success(200, { token });
});

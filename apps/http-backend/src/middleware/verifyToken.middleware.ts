import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError.util";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/config";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (!JWT_SECRET)
    throw new ApiError(
      "[ERROR] FATAL: JWT_SECRET was not provided in the environment variables."
    );
  const token = req.cookies["authToken"];
  if (!token) throw new ApiError("Cannot authorize user.", 401);
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  if (!decoded.userId) throw new ApiError("Invalid token payload", 401);
  req.userId = decoded.userId;
  next();
};

export default verifyToken;

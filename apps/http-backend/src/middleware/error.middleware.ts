import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError.util";

export const handleError = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[ERROR] ${req.method} ${req.url}: `, error);
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error.",
  });
  return;
};

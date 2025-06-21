import { NextFunction, Request, Response } from "express";

type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const asyncHandler = (fn: ControllerType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default asyncHandler;

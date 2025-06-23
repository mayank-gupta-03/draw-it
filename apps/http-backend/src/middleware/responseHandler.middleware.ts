import { NextFunction, Request, Response } from "express";

const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.success = function <T>(statusCode: number, data?: T) {
    this.status(statusCode).json({
      success: true,
      data,
    });
    return;
  };
  next();
};

export default responseHandler;

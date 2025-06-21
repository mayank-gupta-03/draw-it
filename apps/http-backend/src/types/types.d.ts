import "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }

    interface Response {
      success: <T>(statusCode: number, data: T) => void;
    }
  }
}

export {};

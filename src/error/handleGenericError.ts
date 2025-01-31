import { Response } from "express";

export const handleGenericError = (err: any, res: Response) => {
  res.status(err?.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err?.statusCode,
    error: err,
    stack: err?.stack,
  });
};

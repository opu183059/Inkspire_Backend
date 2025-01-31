import { Response } from "express";
import httpStatus from "http-status";

export const handleValidationError = (err: any, res: Response) => {
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: err.message,
    statusCode: httpStatus.BAD_REQUEST,
    error: err,
    stack: err?.stack,
  });
};

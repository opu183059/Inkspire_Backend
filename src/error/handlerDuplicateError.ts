import { Response } from "express";
import httpStatus from "http-status";

export const handlerDuplicateError = (err: any, res: Response) => {
  res.status(httpStatus.CONFLICT).json({
    status: false,
    message: err.message,
    statusCode: httpStatus.CONFLICT,
    error: err,
    stack: err?.stack,
  });
};

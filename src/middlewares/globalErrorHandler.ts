import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { handlerZodError } from "../error/handleZodError";
import { handleCastError } from "../error/handleCastError";
import { handleValidationError } from "../error/handleValidationError";
import { handlerDuplicateError } from "../error/handlerDuplicateError";
import { handleGenericError } from "../error/handleGenericError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.name && err.name === "ZodError") {
    handlerZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err.code && err.code === 11000) {
    handlerDuplicateError(err, res);
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  }
};

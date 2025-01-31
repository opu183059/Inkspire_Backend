import { Response } from "express";
import httpStatus from "http-status";

export const handlerZodError = (err: any, res: Response) => {
  // const issues = err.issues.map((item: any) => {
  //   return {
  //     path: item.path.join(">"),
  //     message: item.message,
  //   };
  // });

  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: err.message,
    statusCode: httpStatus.BAD_REQUEST,
    error: err,
    stack: err?.stack,
  });
};

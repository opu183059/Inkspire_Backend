import { Request, Response, NextFunction } from "express";

export const validateQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.query = req.query || {};
  next();
};

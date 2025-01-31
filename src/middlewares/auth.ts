import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../module/user/user.model";

const Auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // checking the token
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // token verification
    const decoded = jwt.verify(
      token,
      config.jwt_login_token_secret!
    ) as JwtPayload;

    const { userEmail, userRole } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found.");
    }

    // check user is deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted.");
    }

    // checking user is blocked
    const userStatus = user?.isBlocked;
    if (userStatus === true) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is blocked.");
    }

    // check user role based authorization
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    // setting user in request
    req.user = decoded as JwtPayload;
    next();
  });
};

export default Auth;

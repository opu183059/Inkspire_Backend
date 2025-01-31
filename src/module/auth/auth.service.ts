import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config";

const loginUser = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    "+password"
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted.");
  }

  const userStatus = user?.isBlocked;
  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked.");
  }

  //    matching password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  //creating token
  const jwtPayload = {
    userID: user._id,
    userEmail: user.email,
    userRole: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_login_token_secret!, {
    expiresIn: "7d",
  });

  return { token, user };
};

export const AuthServices = {
  loginUser,
};

import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";

const adminUpdateUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true }
  );
  return result;
};

export const adminService = {
  adminUpdateUser,
};

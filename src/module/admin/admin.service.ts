import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { Blog } from "../blogs/blogs.model";

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

const adminDeleteBlog = async (blogId: string) => {
  const result = await Blog.findByIdAndDelete(blogId);
  return result;
};

export const adminService = {
  adminUpdateUser,
  adminDeleteBlog,
};

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { adminService } from "./admin.service";

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.params?.userId;
  const result = await adminService.adminUpdateUser(userId);

  sendResponse(res, {
    success: true,
    message: "User blocked successfully",
    statusCode: httpStatus.OK,
    data: {},
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const blogId = req?.params?.blogId;
  const result = await adminService.adminDeleteBlog(blogId);

  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: httpStatus.OK,
    data: {},
  });
});

export const adminController = {
  updateUser,
  deleteBlog,
};

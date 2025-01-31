import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { blogService } from "./blogs.service";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  payload.author = req.user.userID;
  const result = await blogService.createBlog(payload);

  sendResponse(res, {
    success: true,
    message: "Blog created successfully",
    statusCode: httpStatus.CREATED,
    data: {
      _id: result._id,
      title: result.title,
      content: result.content,
      author: result.author,
    },
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const blogId = req?.params?.blogId;
  const payload = req?.body;
  const userID = req?.user?.userID;
  payload.author = userID;
  const result = await blogService.updateBlog(blogId, userID, payload);

  sendResponse(res, {
    success: true,
    message: "Blog updated successfully",
    statusCode: httpStatus.CREATED,
    data: {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: result?.author,
    },
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getAllBlogs(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blogs fetched successfully",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const blogId = req.params.blogId;

  const result = await blogService.getSingleBlog(blogId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog is Retrived succesfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const blogId = req?.params?.blogId;
  const userID = req?.user?.userID;
  const result = await blogService.deleteBlog(blogId, userID);

  sendResponse(res, {
    success: true,
    message: "Blog deleted successfully",
    statusCode: httpStatus.OK,
    data: {},
  });
});

export const blogController = {
  createBlog,
  updateBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
};

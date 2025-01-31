import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IBlog } from "./blogs.interface";
import { Blog } from "./blogs.model";

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const result = (await Blog.create(payload)).populate("author", {
    name: 1,
    email: 1,
  });
  return result;
};

const updateBlog = async (
  blogId: string,
  userID: string,
  payload: Partial<IBlog>
) => {
  const findBlogById = await Blog.findById(blogId);

  if (!findBlogById) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  } else if (findBlogById.author && findBlogById.author.toString() !== userID) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not allowed to update this blog"
    );
  }

  const result = await Blog.findOneAndUpdate(
    { _id: blogId, author: userID },
    payload,
    {
      new: true,
    }
  ).populate("author", {
    name: 1,
    email: 1,
  });
  return result;
};

const getAllBlogs = async (query: any): Promise<IBlog[]> => {
  const { search, sortBy, sortOrder, filter } = query;
  const conditions: any = {};
  const sort: any = {};

  if (search) {
    conditions.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  if (filter) {
    conditions.author = filter;
  }

  if (sortBy) {
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  const result = await Blog.find(conditions).sort(sort).populate("author", {
    name: 1,
    email: 1,
    _id: 0,
  });
  return result;
};

const getSingleBlog = async (blogId: string) => {
  const result = await Blog.findById(blogId).populate("author", {
    name: 1,
    email: 1,
    _id: 0,
  });
  return result;
};

const deleteBlog = async (blogId: string, userID: string) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  } else if (blog.author && blog.author.toString() !== userID) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not allowed to delete this blog"
    );
  }
  const result = await Blog.findByIdAndDelete(blogId);
  return result;
};

export const blogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};

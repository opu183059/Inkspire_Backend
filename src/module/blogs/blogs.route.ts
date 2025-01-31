import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidation } from "./blogs.validation";
import { blogController } from "./blogs.controller";
import { validateQuery } from "../../middlewares/validateQuery";
import Auth from "../../middlewares/auth";

const blogRouter = Router();
// create blog
blogRouter.post(
  "/",
  Auth("user", "admin"),
  validateRequest(BlogValidation.blogsValidationSchema),
  blogController.createBlog
);

// get all blogs (Public route)
blogRouter.get("/", validateQuery, blogController.getAllBlogs);

// get single blog for both user and admin
blogRouter.get("/:blogId", Auth("admin", "user"), blogController.getSingleBlog);

// update blog
blogRouter.patch(
  "/:blogId",
  Auth("user"),
  validateRequest(BlogValidation.updateBlogsValidationSchema),
  blogController.updateBlog
);

// delete blog
blogRouter.delete("/:blogId", Auth("user"), blogController.deleteBlog);

export default blogRouter;

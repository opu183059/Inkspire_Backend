import { Router } from "express";
import Auth from "../../middlewares/auth";
import { adminController } from "./admin.controller";

const adminRouter = Router();

// block user as admin
adminRouter.patch(
  "/users/:userId/block",
  Auth("admin"),
  adminController.updateUser
);

// delete blog as admin
adminRouter.delete("/blogs/:blogId", Auth("admin"), adminController.deleteBlog);

export default adminRouter;

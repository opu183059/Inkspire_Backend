import { Router } from "express";
import { userController } from "./user.controller";
import Auth from "../../middlewares/auth";

const userRouter = Router();
// get all users as admin
userRouter.get("/", Auth("admin"), userController.getUser);

// get single user
userRouter.get("/:userId", Auth("admin", "user"), userController.getSingleUser);

// update block status
userRouter.put(
  "/:userId/toggle-block",
  Auth("admin"),
  userController.handleBlockStatus
);

// update delete status
userRouter.put(
  "/:userId/toggle-delete",
  Auth("admin"),
  userController.handleDeleteStatus
);

export default userRouter;

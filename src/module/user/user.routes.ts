import { Router } from "express";
import { userController } from "./user.controller";
import Auth from "../../middlewares/auth";

const userRouter = Router();
// get all users as admin
userRouter.get("/", Auth("admin"), userController.getUser);

// get single user as admin
userRouter.get("/:userId", Auth("admin"), userController.getSingleUser);

export default userRouter;

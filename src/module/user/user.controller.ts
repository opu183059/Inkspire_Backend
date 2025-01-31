import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  // selected name, email, password from req.body to secure manually admin role creation
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const result = await userService.registerUser(payload);

  sendResponse(res, {
    success: true,
    message: "User registered successfully",
    statusCode: httpStatus.CREATED,
    data: {
      id: result._id,
      name: result.name,
      email: result.email,
    },
  });
});

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is Retrived succesfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;

  const result = await userService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Data of "${result?.name}" is Retrived succesfully`,
    data: result,
  });
});

export const userController = {
  registerUser,
  getUser,
  getSingleUser,
};

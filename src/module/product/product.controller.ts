import { Request, Response } from "express";
import { productService } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  payload.author = req.user.userID;
  const result = await productService.createProduct(payload);

  sendResponse(res, {
    success: true,
    message: "Product is created successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const getProduct = catchAsync(async (req, res) => {
  const result = await productService.getAllProductWithQuery(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const result = await productService.getSingleProduct(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is Retrived succesfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req?.params?.productId;
  const payload = req?.body;
  const userID = req?.user?.userID;
  payload.author = userID;
  const result = await productService.updateProduct(productId, userID, payload);

  sendResponse(res, {
    success: true,
    message: "Product updated successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req?.params?.productId;
  const userID = req?.user?.userID;
  const result = await productService.deleteProduct(productId, userID);

  sendResponse(res, {
    success: true,
    message: "Product deleted successfully",
    statusCode: httpStatus.OK,
    data: {},
  });
});

export const productController = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};

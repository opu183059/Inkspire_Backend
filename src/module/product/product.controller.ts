import { Request, Response } from "express";
import { productService } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  // payload.author = req.user.userID;
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
    message: "Blogs fetched successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const result = await productService.getSingleProduct(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog is Retrived succesfully",
    data: result,
  });
});

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const body = req.body;
    const result = await productService.updateProduct(productId, body);

    res.send({
      status: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Error in updating",
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await productService.deleteProduct(productId);
    res.send({
      status: true,
      message: "Product deleted successfully",
      data: {},
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Error in deleting the product",
      error,
    });
  }
};

export const productController = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};

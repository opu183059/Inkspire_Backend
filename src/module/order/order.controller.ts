import { Request, Response } from "express";
import { Product } from "../product/product.model";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { orderService } from "./order.service";
import { productService } from "../product/product.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  payload.customer = req.user.userID;

  let totalAmount = 0;

  // Validate stock and calculate total price
  for (const item of payload.items) {
    const product = await productService.getSingleProduct(item.product);

    if (!product) {
      return sendResponse(res, {
        success: false,
        message: "Product not found",
        statusCode: httpStatus.NOT_FOUND,
        data: {},
      });
    }

    if (product.quantity < item.quantity) {
      return sendResponse(res, {
        success: false,
        message: `Insufficient stock for ${product.name}`,
        statusCode: httpStatus.BAD_REQUEST,
        data: { productId: product._id, productName: product.name },
      });
    }

    totalAmount += product.price * item.quantity;
  }

  payload.totalAmount = totalAmount;

  // Create and save order
  const result = await orderService.createOrder(payload, req?.ip!);

  // Deduct stock after validation
  for (const item of payload.items) {
    const updatedProduct = await Product.findByIdAndUpdate(
      item.product,
      {
        $inc: { quantity: -item.quantity },
      },
      { new: true }
    );

    // If stock reaches 0, update availability to false
    if (updatedProduct && updatedProduct.quantity === 0) {
      await Product.findByIdAndUpdate(item.product, { inStock: false });
    }
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order placed successfully",
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order verified successfully",
    data: order,
  });
});

const getOrdersByCustomerId = catchAsync(
  async (req: Request, res: Response) => {
    const customerId = req.params.customerId;
    const result = await orderService.getOrdersByCustomerId(customerId);

    sendResponse(res, {
      success: true,
      message: "Orders fetched successfully",
      statusCode: httpStatus.OK,
      data: result,
    });
  }
);

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrders(req.query);

  sendResponse(res, {
    success: true,
    message: "Orders fetched successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const orderId = req?.params?.orderId;
  const payload = req?.body;
  const result = await orderService.updateOrder(orderId, payload);

  sendResponse(res, {
    success: true,
    message: "Orders updated successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const orderId = req?.params?.orderId;
  const result = await orderService.deleteOrder(orderId);

  sendResponse(res, {
    success: true,
    message: "Product deleted successfully",
    statusCode: httpStatus.OK,
    data: {},
  });
});

export const orderController = {
  createOrder,
  verifyPayment,
  getOrdersByCustomerId,
  getAllOrders,
  updateOrder,
  deleteOrder,
};

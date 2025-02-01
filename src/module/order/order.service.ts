import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const result = await Order.create(payload);
  return result;
};

const getAllOrders = async (query: any): Promise<IOrder[]> => {
  const { status, sortBy, sortOrder } = query;
  const conditions: any = {};
  const sort: any = {};

  if (status) {
    conditions.status = { $regex: status, $options: "i" };
  }
  if (sortBy) {
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  const result = await Order.find(conditions).sort(sort).populate("customer", {
    name: 1,
    email: 1,
  });
  return result;
};

const updateOrder = async (productId: string, payload: Partial<IOrder>) => {
  const findOrderById = await Order.findById(productId);

  if (!findOrderById) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }

  const result = await Order.findOneAndUpdate({ _id: productId }, payload, {
    new: true,
    runValidators: true,
  }).populate("customer", {
    name: 1,
    email: 1,
  });
  return result;
};

const deleteOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }
  const result = await Order.findByIdAndDelete(orderId);
  return result;
};

export const orderService = {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};

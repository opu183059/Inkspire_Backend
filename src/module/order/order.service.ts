import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const result = await Order.create(payload);
  return result;
};

export const orderService = {
  createOrder,
};

import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { orderUtils } from "./order.utils";
import { User } from "../user/user.model";

const createOrder = async (payload: IOrder, client_ip: string) => {
  const userDetails = await User.findById(payload.customer);
  let order = await Order.create(payload);

  // payment integration
  const shurjopayPayload = {
    amount: payload.totalAmount,
    order_id: order._id,
    currency: "BDT",
    customer_name: userDetails?.name,
    customer_address: "Bangladesh",
    customer_email: userDetails?.email,
    customer_phone: "N/A",
    customer_city: "N/A",
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
  // return order;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};

const getOrdersByCustomerId = async (customerId: string): Promise<IOrder[]> => {
  const orders = await Order.find({ customer: customerId }).sort({
    createdAt: -1,
  });

  if (!orders.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No orders found for this customer"
    );
  }

  return orders;
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
  } else {
    sort["createdAt"] = -1;
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
  verifyPayment,
  getOrdersByCustomerId,
  getAllOrders,
  updateOrder,
  deleteOrder,
};

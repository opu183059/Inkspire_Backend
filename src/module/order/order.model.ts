import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
          min: [1, "Atleast 1 item is required"],
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be atleast 1"],
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: {
        values: ["pending", "processing", "shipped", "delivered", "cancelled"],
        message: "{VALUE} is not valid, please provide a valid status ",
      },
      default: "pending",
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);

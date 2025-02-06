import { Types } from "mongoose";

export interface SingleItem {
  product: Types.ObjectId;
  quantity: number;
}
export interface IOrder {
  customer: Types.ObjectId;
  items: SingleItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
}

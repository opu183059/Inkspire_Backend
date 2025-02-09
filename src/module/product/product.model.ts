import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, "Products price cannot be negative"],
    },
    category: {
      type: String,
      enum: {
        values: [
          "Writing",
          "Office Supplies",
          "Art Supplies",
          "Educational",
          "Technology",
        ],
        message: "{VALUE} is not valid, please provide a valid category ",
      },
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
    },
    imageUrl: {
      type: String,
      default: "https://demofree.sirv.com/nope-not-here.jpg",
    },
    inStock: { type: Boolean, default: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);

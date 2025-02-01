import { z } from "zod";

const OrderItemSchema = z.object({
  product: z.string({
    invalid_type_error: "Product Name must be String",
    required_error: "Product name is required",
  }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});

const orderValidationSchema = z.object({
  body: z.object({
    items: z
      .array(OrderItemSchema)
      .nonempty({ message: "At least one item is required" }),
  }),
});

const orderUpdateValidationSchema = z.object({
  body: z.object({
    status: z.string({
      invalid_type_error: "status must be String",
    }),
  }),
});

export const orderValidation = {
  orderValidationSchema,
  orderUpdateValidationSchema,
};

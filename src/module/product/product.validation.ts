import { z } from "zod";

const productValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Product Name must be String",
      required_error: "Product name is required",
    }),

    brand: z.string({
      invalid_type_error: "Name must be String",
      required_error: "Name is required",
    }),

    price: z.number({
      required_error: "Price is required",
      invalid_type_error: "Price must be Number",
    }),

    quantity: z.number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be Number",
    }),

    category: z.string({
      invalid_type_error: "Content must be string",
      required_error: "Content is required",
    }),

    description: z.string({
      invalid_type_error: "Description must be string",
      required_error: "Description is required",
    }),

    inStock: z.boolean().optional(),
  }),
});

const productUpdateValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ invalid_type_error: "Product Name must be String" })
      .optional(),

    brand: z
      .string({
        invalid_type_error: "Name must be String",
      })
      .optional(),

    price: z
      .number({
        invalid_type_error: "Price must be Number",
      })
      .optional(),

    quantity: z
      .number({
        invalid_type_error: "Quantity must be Number",
      })
      .optional(),

    category: z
      .string({
        invalid_type_error: "Content must be string",
      })
      .optional(),

    description: z
      .string({
        invalid_type_error: "Description must be string",
      })
      .optional(),

    inStock: z.boolean().optional(),
  }),
});

export const ProductValidation = {
  productValidationSchema,
  productUpdateValidationSchema,
};

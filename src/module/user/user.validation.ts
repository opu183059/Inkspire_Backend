import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z.string({
      invalid_type_error: "Password must be string",
      required_error: "Password is required",
    }),
    role: z.enum(["admin", "user"]).optional(),
    isBlocked: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
};

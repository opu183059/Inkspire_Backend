import { z } from "zod";

const blogsValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    }),
    content: z.string({
      invalid_type_error: "Content must be string",
      required_error: "Content is required",
    }),
    isPublished: z.boolean().optional(),
  }),
});

const updateBlogsValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: "Name must be string",
      })
      .optional(),
    content: z
      .string({
        invalid_type_error: "Content must be string",
      })
      .optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const BlogValidation = {
  blogsValidationSchema,
  updateBlogsValidationSchema,
};

import { Router } from "express";
import { productController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import Auth from "../../middlewares/auth";

const productRouter = Router();

// Create Product
productRouter.post(
  "/",
  Auth("admin"),
  validateRequest(ProductValidation.productValidationSchema),
  productController.createProduct
);

// Get all product with search, filters
productRouter.get("/", productController.getProduct);

// Get single Product
productRouter.get("/:productId", productController.getSingleProduct);

// Update single Product
productRouter.put(
  "/:productId",
  Auth("admin"),
  validateRequest(ProductValidation.productUpdateValidationSchema),
  productController.updateProduct
);

productRouter.delete(
  "/:productId",
  Auth("admin"),
  productController.deleteProduct
);

export default productRouter;

import { Router } from "express";
import { productController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";

const productRouter = Router();

// Create Product
productRouter.post(
  "/",
  validateRequest(ProductValidation.productValidationSchema),
  productController.createProduct
);

// Get all product with search, filters
productRouter.get("/", productController.getProduct);

// Get single Product
productRouter.get("/:productId", productController.getSingleProduct);

productRouter.put("/:productId", productController.updateProduct);
productRouter.delete("/:productId", productController.deleteProduct);

export default productRouter;

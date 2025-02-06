import { Router } from "express";
import { orderController } from "./order.controller";
import Auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { orderValidation } from "./order.validation";

const orderRouter = Router();
// Create order
orderRouter.post(
  "/",
  Auth("admin", "user"),
  validateRequest(orderValidation.orderValidationSchema),
  orderController.createOrder
);

orderRouter.get(
  "/verify",
  Auth("admin", "user"),
  orderController.verifyPayment
);
// Get all orders
orderRouter.get("/", Auth("admin"), orderController.getAllOrders);

// Update order
orderRouter.put(
  "/update-order/:orderId",
  Auth("admin"),
  validateRequest(orderValidation.orderUpdateValidationSchema),
  orderController.updateOrder
);
// Delete order
orderRouter.delete(
  "/delete-order/:orderId",
  Auth("admin"),
  orderController.deleteOrder
);

export default orderRouter;

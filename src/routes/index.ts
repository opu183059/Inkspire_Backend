import { Router } from "express";
import userRouter from "../module/user/user.routes";
import authRouter from "../module/auth/auth.routes";
import adminRouter from "../module/admin/admin.routes";
import orderRouter from "../module/order/order.routes";
import productRouter from "../module/product/product.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/admin",
    route: adminRouter,
  },
  {
    path: "/order",
    route: orderRouter,
  },
  {
    path: "/products",
    route: productRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

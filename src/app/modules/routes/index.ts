import express from "express";
import { OrderRoutes } from "../orders/orders.route";
import { ProductRoutes } from "../products/products.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/products",
    route: ProductRoutes
  },
  {
    path: "/orders",
    route: OrderRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

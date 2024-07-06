import express from "express";
import { OrdersController } from "./orders.controller";

const router = express.Router();

router.post("/", OrdersController.createOrder);
router.get("/", OrdersController.getAllOrders);

export const OrderRoutes = router;

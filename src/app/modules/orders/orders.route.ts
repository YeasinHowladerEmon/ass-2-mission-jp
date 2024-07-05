import express from "express";
import { OrdersController } from "./orders.controller";

const router = express.Router();

router.post("/Orders", OrdersController.createOrder);
router.get("/Orders", OrdersController.getAllOrders);

export const OrderRoutes = router;

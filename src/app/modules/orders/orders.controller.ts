import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../../common/async";
import { OrderService } from "./orders.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await OrderService.createOrder(res, data);
  res.status(httpStatus.OK).json({
    success: true,
    messages: "Order is created Successfully",
    data: result
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders(req);
  if (result.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Order not found"
    });
  }
  if (req.query.email) {
    res.status(httpStatus.OK).json({
      success: true,
      messages: "Orders fetched successfully for user email!",
      data: result
    });
  } else {
    res.status(httpStatus.OK).json({
      success: true,
      messages: "Orders retrieved successfully",
      data: result
    });
  }
});

export const OrdersController = {
  createOrder,
  getAllOrders
};

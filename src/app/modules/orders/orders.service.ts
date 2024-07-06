import { Request, Response } from "express";
import mongoose from "mongoose";
import { Product } from "../products/products.model";
import { IOrders } from "./orders.interfaces";
import { Order } from "./orders.model";

const createOrder = async (res: Response, payload: IOrders) => {
  console.log(payload);
  // const product = await Product.findById(payload.productId);
  // console.log(product);
  const product = await Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(payload.productId),
        "inventory.quantity": { $gte: payload.quantity }
      }
    },
    {
      $set: {
        "inventory.quantity": {
          $subtract: ["$inventory.quantity", payload.quantity]
        },
        "inventory.inStock": {
          $cond: {
            if: {
              $gt: [{ $subtract: ["$inventory.quantity", payload.quantity] }, 0]
            },
            then: true,
            else: false
          }
        }
      }
    }
  ]);
  console.log(product);
  if (product.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Product not available or insufficient stock"
    });
  }

  const result = await Order.create(payload);
  return result;
};

const getAllOrders = async (req: Request): Promise<IOrders[]> => {
  console.log(req.query.email);

  const filter =
    req?.query?.email?.length !== 0 ? { email: req.query?.email } : {};
  const result = await Order.find(filter);
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders
};

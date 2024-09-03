import { Request, Response } from "express";
import mongoose from "mongoose";
import { Product } from "../products/products.model";
import { IOrders } from "./orders.interfaces";
import { Order } from "./orders.model";

const createOrder = async (res: Response, payload: IOrders) => {
  console.log(payload);
  // const product = await Product.findById(payload.productId);
  // console.log(product);
  // const product = await Product.aggregate([
  //   {
  //     $match: {
  //       _id: new mongoose.Types.ObjectId(payload.productId),
  //       "inventory.quantity": { $gte: payload.quantity }
  //     }
  //   },
  //   {
  //     $set: {
  //       "inventory.quantity": {
  //         $subtract: ["$inventory.quantity", payload.quantity]
  //       },
  //       "inventory.inStock": {
  //         $cond: {
  //           if: {
  //             $gt: [{ $subtract: ["$inventory.quantity", payload.quantity] }, 0]
  //           },
  //           then: true,
  //           else: false
  //         }
  //       }
  //     }
  //   },
  //   {
  //     $merge: {
  //       into: "products", // Replace with your actual collection name
  //       whenMatched: "replace", // This replaces the document with the new version
  //       whenNotMatched: "discard" // This prevents insertion of a new document
  //     }
  //   }
  // ]);

  const product = await Product.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(payload.productId),
      "inventory.quantity": { $gte: payload.quantity }
    },
    [
      {
       
        $set: {
          "inventory.quantity": {
            $subtract: ["$inventory.quantity", payload.quantity]
          },
          "inventory.inStock": {
            $cond: {
              if: {
                $gt: [
                  { $subtract: ["$inventory.quantity", payload.quantity] },
                  0
                ]
              },
              then: true,
              else: false
            }
          }
        }
      }
    ],
    {
      new: true
    }
  );

  console.log(product);
  if (product === null) {
    return res.status(400).json({
      success: false,
      message: "Insufficient quantity available in inventory"
    });
  }

  const result = await Order.create(payload);
  return result;
};

const getAllOrders = async (req: Request): Promise<IOrders[]> => {
  const email = req.query.email as string | undefined;
  const filter = email ? { email: email } : {};
  const result = await Order.find(filter);
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders
};

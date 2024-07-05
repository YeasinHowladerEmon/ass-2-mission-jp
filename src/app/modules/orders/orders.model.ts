import { Schema, model } from "mongoose";
import { IOrders, OrdersModel } from "./orders.interfaces";

const OrdersSchema = new Schema<IOrders>(
  {
    email: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export const Order = model<IOrders, OrdersModel>("Orders", OrdersSchema);

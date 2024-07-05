import { Model } from "mongoose";

export type IOrders = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export type OrdersModel = Model<IOrders, Record<string, unknown>>;

import { Model } from "mongoose";

export type IProducts = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: [
    {
      type: string;
      value: string;
    }
  ];
  inventory: {
    quantity: string;
    inStock: string;
  };
};

export type ProductModel = Model<IProducts, Record<string, unknown>>;
import { Schema, model } from "mongoose";
import { IProducts, ProductModel } from "./products.interfaces";

const ProductSchema = new Schema<IProducts>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    tags: [
      {
        type: String,
        required: true
      }
    ],
    variants: [
      {
        type: {
          type: String,
          required: true
        },
        value: {
          type: String,
          required: true
        }
      }
    ],
    inventory: {
      quantity: {
        type: String,
        required: true
      },
      inStock: {
        type: String,
        required: true
      }
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export const Product = model<IProducts, ProductModel>("Product", ProductSchema);

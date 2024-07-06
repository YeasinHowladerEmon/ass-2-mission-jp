import { Request } from "express";
import { IProducts } from "./products.interfaces";
import { Product } from "./products.model";
const ProductFilterableFields = ["name", "description", "tags", "category"];
const createProduct = async (payload: IProducts) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (req: Request): Promise<IProducts[]> => {
  const { searchTerm } = req.query;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: ProductFilterableFields.map((fields) => ({
        [fields]: {
          $regex: searchTerm,
          $options: "i"
        }
      }))
    });
  }

  const filters = andConditions.length !== 0 ? { $and: andConditions } : {};
  const result = await Product.find(filters);
  return result;
};
const getSingleProduct = async (id: string): Promise<IProducts | null> => {
  const result = await Product.findById(id);
  return result;
};
const updateSingleProduct = async (id: string, payload: Partial<IProducts>) => {
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true
  });
  return result;
};

const deleteProduct = async (id: string): Promise<IProducts | null> => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct
};

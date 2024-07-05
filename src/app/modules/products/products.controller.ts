import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../../common/async";
import { ProductService } from "./products.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await ProductService.createProduct(data);
  res.status(httpStatus.OK).json({
    success: true,
    messages: "Product is created Successfully",
    data: result
  });
});

// const getAllProducts = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, ProductFilterableFields);

//   const result = await ProductService.getAllProducts(
//     filters,
//     paginationOptions
//   );
//   res.status(httpStatus.OK).json({
//     success: true,
//     messages: "Products retrieved successfully",
//     data: result
//   });
// });

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductService.getSingleProduct(id);
  res.status(httpStatus.OK).json({
    success: true,
    messages: "Product retrieved successfully",
    data: result
  });
});

const updateSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await ProductService.updateSingleProduct(id, updateData);
  res.status(httpStatus.OK).json({
    success: true,
    messages: "Product update successfully",
    data: result
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProductService.deleteProduct(id);
  res.status(httpStatus.OK).json({
    success: true,
    messages: "Product is deleted Successfully",
    data: result
  });
});
export const ProductController = {
  createProduct,
  //   getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct
};
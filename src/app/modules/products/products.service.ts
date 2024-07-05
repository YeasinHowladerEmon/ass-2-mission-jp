import { IProducts } from "./products.interfaces";
import { Product } from "./products.model";

const createProduct = async (payload: IProducts) => {
  const result = await Product.create(payload);
  return result;
};

// const getAllProducts = async (
//   filters: IProductFilters,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<IProduct[]>> => {
//   const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;
//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       $or: ProductFilterableFields.map((fields) => ({
//           [fields]: {
//               $regex: searchTerm,
//               $options: "i"
//             }
//       }))
//     });
//   }

//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value
//       }))
//     });
//   }

//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);

//   const sortConditions: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }

//   const whereConditionData =
//     andConditions.length !== 0 ? { $and: andConditions } : {};
//   // const whereConditionsData = andConditions.length > 0 ? { $and: andConditions } : {};

//   const result = await Product.find(whereConditionData)
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);
//   const total = await Product.countDocuments(whereConditionData);
//   return {
//     meta: {
//       page,
//       limit,
//       total
//     },
//     data: result
//   };
// };
const getSingleProduct = async (id: string): Promise<IProducts | null> => {
  const result = await Product.findById(id).populate("seller");
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
  //   getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const products_model_1 = require("./products.model");
const ProductFilterableFields = ["name", "description", "tags", "category"];
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield products_model_1.Product.create(payload);
    return result;
});
const getAllProducts = (req) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield products_model_1.Product.find(filters);
    return result;
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findById(id);
    return result;
});
const updateSingleProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findOneAndUpdate({ _id: id }, payload, {
        new: true
    });
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findByIdAndDelete(id);
    return result;
});
exports.ProductService = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteProduct
};

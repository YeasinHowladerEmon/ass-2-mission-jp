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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const products_model_1 = require("../products/products.model");
const orders_model_1 = require("./orders.model");
const createOrder = (res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    // const product = await Product.findById(payload.productId);
    // console.log(product);
    const product = yield products_model_1.Product.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(payload.productId),
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
    const result = yield orders_model_1.Order.create(payload);
    return result;
});
const getAllOrders = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    const filter = email ? { email: email } : {};
    const result = yield orders_model_1.Order.find(filter);
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders
};

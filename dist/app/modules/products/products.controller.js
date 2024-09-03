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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const async_1 = __importDefault(require("../../../common/async"));
const products_service_1 = require("./products.service");
const products_validation_1 = require("./products.validation");
const createProduct = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = __rest(req.body, []);
    const zodParseData = products_validation_1.ProductValidationSchema.parse(data);
    console.log(zodParseData);
    const result = yield products_service_1.ProductService.createProduct(zodParseData);
    res.status(http_status_1.default.OK).json({
        success: true,
        messages: "Product is created Successfully",
        data: result
    });
}));
const getAllProducts = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_service_1.ProductService.getAllProducts(req);
    res.status(http_status_1.default.OK).json({
        success: true,
        messages: "Products retrieved successfully",
        data: result
    });
}));
const getSingleProduct = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield products_service_1.ProductService.getSingleProduct(id);
    if (!result) {
        res.status(http_status_1.default.NOT_FOUND).json({
            success: true,
            messages: "Product not found",
            data: result
        });
    }
    res.status(http_status_1.default.OK).json({
        success: true,
        messages: "Product retrieved successfully",
        data: result
    });
}));
const updateSingleProduct = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    const result = yield products_service_1.ProductService.updateSingleProduct(id, updateData);
    res.status(http_status_1.default.OK).json({
        success: true,
        messages: "Product update successfully",
        data: result
    });
}));
const deleteProduct = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield products_service_1.ProductService.deleteProduct(id);
    res.status(http_status_1.default.OK).json({
        success: true,
        messages: "Product is deleted Successfully",
        data: result
    });
}));
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteProduct
};

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
exports.OrdersController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const async_1 = __importDefault(require("../../../common/async"));
const orders_service_1 = require("./orders.service");
const orders_validation_1 = require("./orders.validation");
const createOrder = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = __rest(req.body, []);
    const zodParseData = orders_validation_1.OrderSchema.parse(data);
    const result = yield orders_service_1.OrderService.createOrder(res, zodParseData);
    res.status(http_status_1.default.OK).json({
        success: true,
        messages: "Order is created Successfully",
        data: result
    });
}));
const getAllOrders = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.OrderService.getAllOrders(req);
    if (result.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Order not found"
        });
    }
    if (req.query.email) {
        res.status(http_status_1.default.OK).json({
            success: true,
            messages: "Orders fetched successfully for user email!",
            data: result
        });
    }
    else {
        res.status(http_status_1.default.OK).json({
            success: true,
            messages: "Orders retrieved successfully",
            data: result
        });
    }
}));
exports.OrdersController = {
    createOrder,
    getAllOrders
};

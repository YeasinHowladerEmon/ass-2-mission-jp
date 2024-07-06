"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_route_1 = require("../orders/orders.route");
const products_route_1 = require("../products/products.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/products",
        route: products_route_1.ProductRoutes
    },
    {
        path: "/orders",
        route: orders_route_1.OrderRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

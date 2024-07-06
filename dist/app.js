"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./app/modules/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parse
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application
app.use("/api", routes_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Route not found"
    });
    next();
});
exports.default = app;

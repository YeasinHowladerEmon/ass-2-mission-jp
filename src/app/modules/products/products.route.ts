import express from "express";
import { ProductController } from "./products.controller";

const router = express.Router();

router.get("/products/:id", ProductController.getSingleProduct);
router.post("/products", ProductController.createProduct);
router.patch("/products/:id", ProductController.updateSingleProduct);

router.delete("/products/:id", ProductController.deleteProduct);
// router.get("/products", ProductController.getAllProducts);

export const ProductRoutes = router;

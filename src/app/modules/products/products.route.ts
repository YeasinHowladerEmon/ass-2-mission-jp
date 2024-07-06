import express from "express";
import { ProductController } from "./products.controller";

const router = express.Router();

router.get("/:id", ProductController.getSingleProduct);
router.post("/", ProductController.createProduct);
router.put("/:id", ProductController.updateSingleProduct);

router.delete("/:id", ProductController.deleteProduct);
router.get("/", ProductController.getAllProducts);

export const ProductRoutes = router;

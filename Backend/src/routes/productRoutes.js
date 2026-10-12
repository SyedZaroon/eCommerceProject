import express from "express";

import { uploadSingleImage } from "../middlewares/uploadMiddleware.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productcontrollers.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", uploadSingleImage, createProduct);
router.patch("/update/:id", uploadSingleImage, updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
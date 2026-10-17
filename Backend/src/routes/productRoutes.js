import express from "express";

import { uploadSingleImage } from "../middlewares/uploadMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productcontrollers.js";
import {
  authorizePermission,
  checkUserActive,
  verifyToken,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  checkUserActive,
  authorizePermission("PRODUCTS", "READ"),
  getAllProducts,
);

router.get(
  "/:id",
  verifyToken,
  checkUserActive,
  authorizePermission("PRODUCTS", "READ"),
  getProductById,
);

router.post(
  "/",
  verifyToken,
  checkUserActive,
  authorizePermission("PRODUCTS", "CREATE"),
  uploadSingleImage,
  createProduct,
);
router.patch(
  "/update/:id",
  verifyToken,
  checkUserActive,
  authorizePermission("PRODUCTS", "UPDATE"),
  uploadSingleImage,
  updateProduct,
);

router.delete(
  "/delete/:id",
  checkUserActive,
  verifyToken,
  authorizePermission("PRODUCTS", "DELETE"),
  deleteProduct,
);

export default router;

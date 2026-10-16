import express from "express";

import { uploadSingleImage } from "../middlewares/uploadMiddleware.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productcontrollers.js";
import { authorizePermission, checkUserActive, verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    checkUserActive, 
    verifyToken, 
    authorizePermission("PRODUCTS", "READ"),  
    getAllProducts
);

router.get(
  "/:id",
  checkUserActive,      
  verifyToken, 
  authorizePermission("PRODUCTS", "READ"),   
  getProductById
);

router.post(
  "/", 
  checkUserActive, 
  verifyToken, 
  authorizePermission("PRODUCTS", "CREATE"), 
  uploadSingleImage, 
  createProduct
);
router.patch(
  "/update/:id", 
  checkUserActive, 
  verifyToken, 
  authorizePermission("PRODUCTS", "UPDATE"), 
  uploadSingleImage, 
  updateProduct
);

router.delete(
  "/delete/:id", 
  checkUserActive, 
  verifyToken, 
  authorizePermission("PRODUCTS", "DELETE"), 
  deleteProduct
);

export default router;
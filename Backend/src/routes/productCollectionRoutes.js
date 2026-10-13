import express from "express";
import { createProductCollection, deleteProductCollection, getAllProductCollection } from "../controllers/productCollectionControllers.js";

const router = express.Router()

router.put("/", createProductCollection);
router.get("/", getAllProductCollection);
router.delete("/delete/:id", deleteProductCollection);

export default router;
import express from "express";
import { createProductCollection, deleteProductCollection, getAllProductCollection } from "../controllers/productCollectionControllers.js";

const router = express.Router()

router.post("/", createProductCollection);
router.get("/", getAllProductCollection);
router.delete("/delete/:id", deleteProductCollection);

export default router;
import express from "express";
import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/adminControllers.js";


const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.patch("/update/:id", updateUser);



export default router;
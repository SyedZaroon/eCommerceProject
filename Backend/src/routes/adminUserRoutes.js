import express from "express";
import { createUser, deleteUser, getAllUsers, loginUser, logoutUser, updateUser } from "../controllers/admincontrollers.js";


const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.patch("/update/:id", updateUser);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
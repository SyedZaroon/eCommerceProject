import express from "express";
import { loginUser, logoutUser } from "../controllers/authControllers.js";



const router = express.Router();

router.post("/login",  loginUser);
router.post("/logout", logoutUser);

export default router;
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import adminUserRoutes from "./routes/adminUserRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import productCollectionRoutes from "./routes/productCollectionRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.use("/api/auth", customerAuthRoutes);
app.use("/api/admin/users", adminUserRoutes);

app.use("/api/products", productRoutes);

app.use("/api/productcollection", productCollectionRoutes )


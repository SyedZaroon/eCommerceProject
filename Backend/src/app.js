import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import adminUserRoutes from "./routes/adminUserRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import productCollectionRoutes from "./routes/productCollectionRoutes.js";
import authRoutes from "./routes/authRoutes.js";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// app.use("/api/auth", customerAuthRoutes);
app.use("/api/admin/users", adminUserRoutes);

app.use("/api/products", productRoutes);

app.use("/api/productcollection", productCollectionRoutes )

app.use("/api", authRoutes)


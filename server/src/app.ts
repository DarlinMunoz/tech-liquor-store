import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "@/routes/auth.routes";
import productRoutes from "@/routes/product.routes";
import { FRONTEND_URL } from "@/config/env";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

export default app;

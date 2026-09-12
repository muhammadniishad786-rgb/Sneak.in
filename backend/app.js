import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/config/connectDB.js";
import authRoute from "./src/routes/authRoutes.js";
import userRoute from "./src/routes/userRoutes.js";
import adminRoute from "./src/routes/adminRoutes.js";
import productRoute from "./src/routes/productRoutes.js";
import path from "path";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api", userRoute);
app.use("/api", adminRoute);
app.use("/api", productRoute);

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src", "uploads"))
);

// MongoDB connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
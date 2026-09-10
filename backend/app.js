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
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api", userRoute);
app.use("/api", adminRoute);
app.use("/api", productRoute);

app.use("/uploads", express.static(path.join(process.cwd(), "src", "uploads")));

// mongo DB connection
connectDB();
console.log("MONGO", process.env.MONGO_DB_URL);

app.listen(PORT, () => {
  console.log("server running ");
});

// "Whenever someone requests /uploads/..., look inside my src/uploads folder."

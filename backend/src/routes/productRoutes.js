import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middleware/uploadMiddlware.js";

const router = express.Router();

router.post("/product", authMiddleware, upload.single("image") ,createProduct);
router.get("/product", authMiddleware, getProducts);
router.get("/product/:id", authMiddleware, getProductById);
router.put("/product/:id", authMiddleware, upload.single("image"), updateProduct);
router.delete("/product/:id", authMiddleware, deleteProduct);

export default router;

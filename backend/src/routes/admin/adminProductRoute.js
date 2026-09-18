import express from "express";


import adminMiddleware from "../../middleware/adminMiddleware.js";
import authMiddleware from "../../middleware/authMiddleware.js"
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../../controllers/productController.js";
import upload from "../../middleware/uploadMiddlware.js";


const router = express.Router();

router.post(
    "/admin/products",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    createProduct
)

router.get(
  "/admin/products",
  authMiddleware,
  adminMiddleware,
  getProducts
);

router.get(
    "/admin/products/:id",
    authMiddleware,
    adminMiddleware,
    getProductById
)

router.put(
    "/admin/products/:id",
    authMiddleware,
    adminMiddleware,
    updateProduct
)

router.delete(
    "/admin/products/:id",
    authMiddleware,
    adminMiddleware,
    deleteProduct
)

export default router;

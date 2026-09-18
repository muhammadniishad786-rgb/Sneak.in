import express from "express";


import adminMiddleware from "../../middleware/adminMiddleware.js";
import authMiddleware from "../../middleware/authMiddleware.js"
import { deleteAdminProduct, getAdminProducts, updateAdminProduct } from "../../controllers/admin/adminProductController.js";


const router = express.Router();

router.get(
  "/admin/products",
  authMiddleware,
  adminMiddleware,
  getAdminProducts
);

router.put(
    "/admin/products/:id",
    authMiddleware,
    adminMiddleware,
    updateAdminProduct
)

router.delete(
    "/admin/products/:id",
    authMiddleware,
    adminMiddleware,
    deleteAdminProduct
)

export default router;

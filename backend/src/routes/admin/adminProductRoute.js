import express from "express";


import adminMiddleware from "../../middleware/adminMiddleware.js";
import authMiddleware from "../../middleware/authMiddleware.js"
import { getAdminProducts } from "../../controllers/admin/adminProductController.js";


const router = express.Router();

router.get(
  "/admin/products",
  authMiddleware,
  adminMiddleware,
  getAdminProducts
);

export default router;

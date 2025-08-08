import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/controllers/product.controller";
import { authenticate, authorizeRole } from "@/middlewares/auth/authMiddleware";

const router = Router();

router.get("/", getProducts);
router.post("/", authenticate, authorizeRole(["admin", "superadmin"]), createProduct);
router.put("/:id", authenticate, authorizeRole(["admin", "superadmin"]), updateProduct);
router.delete("/:id", authenticate, authorizeRole(["admin", "superadmin"]), deleteProduct);

export default router;

import { authLogin, authLogout, authProfile, authRegister } from "@/controllers/auth.controller";
import { authenticate } from "@/middlewares/auth/authMiddleware";
import { Router } from "express";

const router = Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.post("/logout", authLogout);
router.get("/profile", authenticate, authProfile);

export default router;

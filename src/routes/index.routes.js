import { Router } from "express";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";

const router = Router();
router.use("/api/auth", authRoutes);
router.use("/api/profile", profileRoutes);

export default router;

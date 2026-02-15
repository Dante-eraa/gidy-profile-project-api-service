import { Router } from "express";
import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import careerVisionRoutes from "./careerVision.routes.js";
import experienceRoutes from "./experience.routes.js";
import educationRoutes from "./education.routes.js";
import certificateRoutes from "./certification.routes.js";
import skillRoutes from "./skill.routes.js";
import socialLinkRoutes from "./socialLink.routes.js";
import aiRoutes from "./ai.routes.js";

const router = Router();
router.use("/api/auth", authRoutes);
router.use("/api/profile", profileRoutes);
router.use("/api/career-vision", careerVisionRoutes);
router.use("/api/experience", experienceRoutes);
router.use("/api/education", educationRoutes);
router.use("/api/certificate", certificateRoutes);
router.use("/api/skill", skillRoutes);
router.use("/api/sociallinks", socialLinkRoutes);
router.use("/api/ai", aiRoutes);

export default router;

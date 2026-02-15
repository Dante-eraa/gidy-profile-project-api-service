import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  getProfile,
  getPublicProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { updateProfileSchema } from "../validations/profile.validation.js";

const router = express.Router();

router.patch(
  "/",
  authenticate,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  validate(updateProfileSchema),
  updateProfile,
);
router.get("/public/:slug", getPublicProfile);

router.get(
  "/",
  authenticate, // 🔐 Only logged-in users
  getProfile,
);
export default router;

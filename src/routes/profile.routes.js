import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { updateProfile } from "../controllers/profile.controller.js";
import { updateProfileSchema } from "../validations/profile.validation.js";

const router = express.Router();

router.patch(
  "/",
  authenticate,
  upload.single("profileImage"),
  validate(updateProfileSchema),
  updateProfile,
);

export default router;

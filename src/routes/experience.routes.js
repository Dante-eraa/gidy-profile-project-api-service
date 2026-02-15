import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
  getPublicExperiences,
} from "../controllers/experience.controller.js";
import {
  createExperienceSchema,
  updateExperienceSchema,
} from "../validations/experience.validation.js";

const router = express.Router();

router.get("/", authenticate, getExperiences);
router.get("/public/:profileId", getPublicExperiences);
router.post(
  "/",
  authenticate,
  validate(createExperienceSchema),
  createExperience,
);

router.patch(
  "/:id",
  authenticate,
  validate(updateExperienceSchema),
  updateExperience,
);

router.delete("/:id", authenticate, deleteExperience);

export default router;

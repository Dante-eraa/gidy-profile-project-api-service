import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createEducation,
  getEducations,
  updateEducation,
  deleteEducation,
  getPublicEducations,
} from "../controllers/education.controller.js";
import {
  createEducationSchema,
  updateEducationSchema,
} from "../validations/education.validation.js";

const router = express.Router();

router.get("/", authenticate, getEducations);
router.get("/public/:profileId", getPublicEducations);

router.post(
  "/",
  authenticate,
  validate(createEducationSchema),
  createEducation,
);

router.patch(
  "/:id",
  authenticate,
  validate(updateEducationSchema),
  updateEducation,
);

router.delete("/:id", authenticate, deleteEducation);

export default router;

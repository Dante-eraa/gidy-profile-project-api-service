import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createCareerVision,
  getCareerVision,
  updateCareerVision,
} from "../controllers/careerVision.controller.js";
import {
  careerVisionSchema,
  updateCareerVisionSchema,
} from "../validations/careerVision.validation.js";

const router = express.Router();

router.get("/", authenticate, getCareerVision);
router.post(
  "/",
  authenticate,
  validate(careerVisionSchema),
  createCareerVision,
);

router.patch(
  "/",
  authenticate,
  validate(updateCareerVisionSchema),
  updateCareerVision,
);
export default router;

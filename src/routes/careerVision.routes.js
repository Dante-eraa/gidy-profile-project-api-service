import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createCareerVision,
  getCareerVision,
} from "../controllers/careerVision.controller.js";
import { careerVisionSchema } from "../validations/careerVision.validation.js";

const router = express.Router();

router.get("/", authenticate, getCareerVision);
router.post(
  "/",
  authenticate,
  validate(careerVisionSchema),
  createCareerVision,
);

export default router;

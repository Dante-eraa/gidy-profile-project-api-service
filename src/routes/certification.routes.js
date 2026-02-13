import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createCertification,
  getCertifications,
  updateCertification,
  deleteCertification,
} from "../controllers/certification.controller.js";
import {
  createCertificationSchema,
  updateCertificationSchema,
} from "../validations/certification.validation.js";

const router = express.Router();

router.get("/", authenticate, getCertifications);

router.post(
  "/",
  authenticate,
  validate(createCertificationSchema),
  createCertification,
);

router.patch(
  "/:id",
  authenticate,
  validate(updateCertificationSchema),
  updateCertification,
);

router.delete("/:id", authenticate, deleteCertification);

export default router;

import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createSocialLink,
  getSocialLinks,
  deleteSocialLink,
  updateSocialLink,
} from "../controllers/socialLink.controller.js";
import {
  createSocialLinkSchema,
  updateSocialLinkSchema,
} from "../validations/socialLink.validation.js";

const router = express.Router();

router.get("/", authenticate, getSocialLinks);

router.post(
  "/",
  authenticate,
  validate(createSocialLinkSchema),
  createSocialLink,
);
router.patch(
  "/:id",
  authenticate,
  validate(updateSocialLinkSchema),
  updateSocialLink,
);
router.delete("/:id", authenticate, deleteSocialLink);

export default router;

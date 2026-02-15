import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import {
  createSkill,
  getSkills,
  deleteSkill,
  endorseSkill,
  removeEndorsement,
} from "../controllers/skill.controller.js";

const router = express.Router();

// Skills
router.post("/", authenticate, createSkill);
router.get("/:profileId", getSkills);
router.delete("/:id", authenticate, deleteSkill);

// Endorsements
router.post("/endorse/:skillId", authenticate, endorseSkill);

router.delete("/endorse/:skillId", authenticate, removeEndorsement);

export default router;

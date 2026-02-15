import express from "express";
import authenticate from "../middlewares/auth.middleware.js";
import { generateBio } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/generate-bio", authenticate, generateBio);

export default router;

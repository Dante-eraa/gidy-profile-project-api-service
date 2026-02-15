import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { generateBioService } from "../services/ai.service.js";

export const generateBio = asyncHandler(async (req, res) => {
  const bio = await generateBioService(req.user.id);

  return successResponse(res, {
    message: "AI bio generated successfully",
    data: bio,
  });
});

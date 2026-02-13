import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { updateProfileService } from "../services/profile.service.js";

export const updateProfile = asyncHandler(async (req, res) => {
  const result = await updateProfileService(req.user.id, req.body, req.file);

  return successResponse(res, {
    message: "Profile updated successfully",
    data: result,
  });
});

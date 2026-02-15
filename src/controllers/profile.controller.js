import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import {
  getProfileService,
  getPublicProfileService,
  updateProfileService,
} from "../services/profile.service.js";

export const updateProfile = asyncHandler(async (req, res) => {
  const profileImage = req.files?.profileImage?.[0] || null;
  const resume = req.files?.resume?.[0] || null;

  const result = await updateProfileService(
    req.user.id,
    req.body,
    profileImage,
    resume,
  );

  return successResponse(res, {
    message: "Profile updated successfully",
    data: result,
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const result = await getProfileService(req.user.id);

  return successResponse(res, {
    message: "Profile fetched successfully",
    data: result,
  });
});

export const getPublicProfile = asyncHandler(async (req, res) => {
  const result = await getPublicProfileService(req.params.slug);

  return successResponse(res, {
    message: "Public profile fetched successfully",
    data: result,
  });
});

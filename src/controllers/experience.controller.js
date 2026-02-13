import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import {
  createExperienceService,
  getExperiencesService,
  updateExperienceService,
  deleteExperienceService,
} from "../services/experience.service.js";

export const createExperience = asyncHandler(async (req, res) => {
  const result = await createExperienceService(req.user.id, req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "Experience added successfully",
    data: result,
  });
});

export const getExperiences = asyncHandler(async (req, res) => {
  const result = await getExperiencesService(req.user.id);

  return successResponse(res, {
    message: "Experiences fetched successfully",
    data: result,
  });
});

export const updateExperience = asyncHandler(async (req, res) => {
  const result = await updateExperienceService(
    req.user.id,
    req.params.id,
    req.body,
  );

  return successResponse(res, {
    message: "Experience updated successfully",
    data: result,
  });
});

export const deleteExperience = asyncHandler(async (req, res) => {
  await deleteExperienceService(req.user.id, req.params.id);

  return successResponse(res, {
    message: "Experience deleted successfully",
  });
});

import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import {
  createEducationService,
  getEducationsService,
  updateEducationService,
  deleteEducationService,
} from "../services/education.service.js";

export const createEducation = asyncHandler(async (req, res) => {
  const result = await createEducationService(req.user.id, req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "Education added successfully",
    data: result,
  });
});

export const getEducations = asyncHandler(async (req, res) => {
  const result = await getEducationsService(req.user.id);

  return successResponse(res, {
    message: "Educations fetched successfully",
    data: result,
  });
});

export const updateEducation = asyncHandler(async (req, res) => {
  const result = await updateEducationService(
    req.user.id,
    req.params.id,
    req.body,
  );

  return successResponse(res, {
    message: "Education updated successfully",
    data: result,
  });
});

export const deleteEducation = asyncHandler(async (req, res) => {
  await deleteEducationService(req.user.id, req.params.id);

  return successResponse(res, {
    message: "Education deleted successfully",
  });
});

import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import {
  getCareerVisionService,
  createCareerVisionService,
} from "../services/careerVision.service.js";

export const createCareerVision = asyncHandler(async (req, res) => {
  const result = await createCareerVisionService(req.user.id, req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "Career vision created successfully",
    data: result,
  });
});

export const getCareerVision = asyncHandler(async (req, res) => {
  const result = await getCareerVisionService(req.user.id);

  return successResponse(res, {
    message: "Career vision fetched successfully",
    data: result,
  });
});

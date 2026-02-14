import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import {
  createSocialLinkService,
  getSocialLinksService,
  deleteSocialLinkService,
  updateSocialLinkService,
} from "../services/socialLink.service.js";

export const createSocialLink = asyncHandler(async (req, res) => {
  const result = await createSocialLinkService(req.user.id, req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "Social link added successfully",
    data: result,
  });
});

export const getSocialLinks = asyncHandler(async (req, res) => {
  const result = await getSocialLinksService(req.user.id);

  return successResponse(res, {
    message: "Social links fetched successfully",
    data: result,
  });
});

export const deleteSocialLink = asyncHandler(async (req, res) => {
  await deleteSocialLinkService(req.user.id, req.params.id);

  return successResponse(res, {
    message: "Social link deleted successfully",
  });
});
export const updateSocialLink = asyncHandler(async (req, res) => {
  const result = await updateSocialLinkService(
    req.user.id,
    req.params.id,
    req.body,
  );

  return successResponse(res, {
    message: "Social link updated successfully",
    data: result,
  });
});

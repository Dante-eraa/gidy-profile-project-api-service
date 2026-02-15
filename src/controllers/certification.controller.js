import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import {
  createCertificationService,
  getCertificationsService,
  updateCertificationService,
  deleteCertificationService,
  getCertificationsByProfileIdService,
} from "../services/certification.service.js";

export const createCertification = asyncHandler(async (req, res) => {
  const result = await createCertificationService(req.user.id, req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "Certification added successfully",
    data: result,
  });
});
export const getPublicCertifications = asyncHandler(async (req, res) => {
  const result = await getCertificationsByProfileIdService(
    req.params.profileId,
  );

  return successResponse(res, {
    message: "Public certifications fetched successfully",
    data: result,
  });
});

export const getCertifications = asyncHandler(async (req, res) => {
  const result = await getCertificationsService(req.user.id);

  return successResponse(res, {
    message: "Certifications fetched successfully",
    data: result,
  });
});

export const updateCertification = asyncHandler(async (req, res) => {
  const result = await updateCertificationService(
    req.user.id,
    req.params.id,
    req.body,
  );

  return successResponse(res, {
    message: "Certification updated successfully",
    data: result,
  });
});

export const deleteCertification = asyncHandler(async (req, res) => {
  await deleteCertificationService(req.user.id, req.params.id);

  return successResponse(res, {
    message: "Certification deleted successfully",
  });
});

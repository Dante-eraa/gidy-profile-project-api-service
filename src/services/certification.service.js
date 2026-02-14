import { prisma } from "../config/db.config.js";
import CustomError from "../utils/customErrors.js";
import {
  createCertificationRepo,
  findCertificationsByProfile,
  findCertificationById,
  updateCertificationRepo,
  deleteCertificationRepo,
} from "../repository/certification.repository.js";

export const createCertificationService = async (userId, body) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  if (body.expiryDate && new Date(body.expiryDate) < new Date(body.issueDate)) {
    throw CustomError.badRequest("Expiry date cannot be before issue date");
  }

  return createCertificationRepo({
    ...body,
    profileId: profile.id,
  });
};

export const getCertificationsByProfileIdService = async (profileId) => {
  return prisma.certification.findMany({
    where: { profileId },
    orderBy: { issueDate: "desc" },
  });
};

export const getCertificationsService = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  return findCertificationsByProfile(profile.id);
};

export const updateCertificationService = async (userId, id, body) => {
  const certification = await findCertificationById(id);

  if (!certification) {
    throw CustomError.notFound("Certification not found");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (certification.profileId !== profile.id) {
    throw CustomError.forbidden("Access denied");
  }

  if (
    body.issueDate &&
    body.expiryDate &&
    new Date(body.expiryDate) < new Date(body.issueDate)
  ) {
    throw CustomError.badRequest("Expiry date cannot be before issue date");
  }

  return updateCertificationRepo(id, body);
};

export const deleteCertificationService = async (userId, id) => {
  const certification = await findCertificationById(id);

  if (!certification) {
    throw CustomError.notFound("Certification not found");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (certification.profileId !== profile.id) {
    throw CustomError.forbidden("Access denied");
  }

  await deleteCertificationRepo(id);

  return { message: "Deleted successfully" };
};

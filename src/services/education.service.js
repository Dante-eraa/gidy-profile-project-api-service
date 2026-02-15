import { prisma } from "../config/db.config.js";
import CustomError from "../utils/customErrors.js";
import {
  createEducationRepo,
  findEducationsByProfile,
  findEducationById,
  updateEducationRepo,
  deleteEducationRepo,
} from "../repository/education.repository.js";

export const createEducationService = async (userId, body) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  if (body.endYear && body.endYear < body.startYear) {
    throw CustomError.badRequest("End year cannot be before start year");
  }

  return createEducationRepo({
    ...body,
    profileId: profile.id,
  });
};
export const getEducationsByProfileIdService = async (profileId) => {
  return prisma.education.findMany({
    where: { profileId },
    orderBy: { startYear: "desc" },
  });
};

export const getEducationsService = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  return findEducationsByProfile(profile.id);
};

export const updateEducationService = async (userId, id, body) => {
  const education = await findEducationById(id);

  if (!education) {
    throw CustomError.notFound("Education not found");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (education.profileId !== profile.id) {
    throw CustomError.forbidden("Access denied");
  }

  if (body.startYear && body.endYear && body.endYear < body.startYear) {
    throw CustomError.badRequest("End year cannot be before start year");
  }

  return updateEducationRepo(id, body);
};

export const deleteEducationService = async (userId, id) => {
  const education = await findEducationById(id);

  if (!education) {
    throw CustomError.notFound("Education not found");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (education.profileId !== profile.id) {
    throw CustomError.forbidden("Access denied");
  }

  await deleteEducationRepo(id);

  return { message: "Deleted successfully" };
};

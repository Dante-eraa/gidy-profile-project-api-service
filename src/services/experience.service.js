import { prisma } from "../config/db.config.js";
import CustomError from "../utils/customErrors.js";
import {
  createExperienceRepo,
  findExperiencesByProfile,
  findExperienceById,
  updateExperienceRepo,
  deleteExperienceRepo,
} from "../repository/experience.repository.js";

export const createExperienceService = async (userId, body) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  // Business rule
  if (body.isCurrentlyWorking) {
    body.endDate = null;
  }

  return createExperienceRepo({
    ...body,
    profileId: profile.id,
  });
};

export const getExperiencesService = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  return findExperiencesByProfile(profile.id);
};

export const updateExperienceService = async (userId, id, body) => {
  const experience = await findExperienceById(id);

  if (!experience) {
    throw CustomError.notFound("Experience not found");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (experience.profileId !== profile.id) {
    throw CustomError.forbidden("Access denied");
  }

  if (body.isCurrentlyWorking) {
    body.endDate = null;
  }

  return updateExperienceRepo(id, body);
};

export const deleteExperienceService = async (userId, id) => {
  const experience = await findExperienceById(id);

  if (!experience) {
    throw CustomError.notFound("Experience not found");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (experience.profileId !== profile.id) {
    throw CustomError.forbidden("Access denied");
  }

  await deleteExperienceRepo(id);

  return { message: "Deleted successfully" };
};

import { prisma } from "../config/db.config.js";
import CustomError from "../utils/customErrors.js";
import {
  findCareerVision,
  createCareerVision,
} from "../repository/careerVision.repository.js";

export const createCareerVisionService = async (userId, body) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  const existing = await findCareerVision(profile.id);

  if (existing) {
    throw CustomError.forbidden("Career vision can only be set once");
  }

  return createCareerVision(profile.id, body);
};

export const getCareerVisionService = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  const result = await findCareerVision(profile.id);

  if (!result) {
    throw CustomError.notFound("Career vision not found");
  }

  return result;
};

import { prisma } from "../config/db.config.js";

export const findCareerVision = (profileId) => {
  return prisma.careerVision.findUnique({
    where: { profileId },
  });
};

export const createCareerVision = (profileId, data) => {
  return prisma.careerVision.create({
    data: {
      ...data,
      profileId,
    },
  });
};
export const updateCareerVision = (profileId, data) => {
  return prisma.careerVision.update({
    where: { profileId },
    data,
  });
};

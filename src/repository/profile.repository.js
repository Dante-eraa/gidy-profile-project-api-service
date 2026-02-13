import { prisma } from "../config/db.config.js";

export const findProfileByUserId = (userId) => {
  return prisma.profile.findUnique({
    where: { userId },
  });
};

export const updateProfile = (userId, data) => {
  return prisma.profile.update({
    where: { userId },
    data,
  });
};

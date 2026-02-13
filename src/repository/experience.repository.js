import { prisma } from "../config/db.config.js";

export const createExperienceRepo = (data) => {
  return prisma.experience.create({ data });
};

export const findExperiencesByProfile = (profileId) => {
  return prisma.experience.findMany({
    where: { profileId },
    orderBy: { startDate: "desc" },
  });
};

export const findExperienceById = (id) => {
  return prisma.experience.findUnique({ where: { id } });
};

export const updateExperienceRepo = (id, data) => {
  return prisma.experience.update({
    where: { id },
    data,
  });
};

export const deleteExperienceRepo = (id) => {
  return prisma.experience.delete({
    where: { id },
  });
};

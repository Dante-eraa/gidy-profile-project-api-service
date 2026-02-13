import { prisma } from "../config/db.config.js";

export const createEducationRepo = (data) => {
  return prisma.education.create({ data });
};

export const findEducationsByProfile = (profileId) => {
  return prisma.education.findMany({
    where: { profileId },
    orderBy: { startYear: "desc" },
  });
};

export const findEducationById = (id) => {
  return prisma.education.findUnique({ where: { id } });
};

export const updateEducationRepo = (id, data) => {
  return prisma.education.update({
    where: { id },
    data,
  });
};

export const deleteEducationRepo = (id) => {
  return prisma.education.delete({
    where: { id },
  });
};

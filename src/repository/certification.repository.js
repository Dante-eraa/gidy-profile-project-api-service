import { prisma } from "../config/db.config.js";

export const createCertificationRepo = (data) => {
  return prisma.certification.create({ data });
};

export const findCertificationsByProfile = (profileId) => {
  return prisma.certification.findMany({
    where: { profileId },
    orderBy: { issueDate: "desc" },
  });
};

export const findCertificationById = (id) => {
  return prisma.certification.findUnique({ where: { id } });
};

export const updateCertificationRepo = (id, data) => {
  return prisma.certification.update({
    where: { id },
    data,
  });
};

export const deleteCertificationRepo = (id) => {
  return prisma.certification.delete({
    where: { id },
  });
};

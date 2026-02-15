import { prisma } from "../config/db.config.js";

export const createSocialLinkRepo = (profileId, data) => {
  return prisma.socialLink.create({
    data: {
      ...data,
      profileId,
    },
  });
};

export const findSocialLinksByProfile = (profileId) => {
  return prisma.socialLink.findMany({
    where: { profileId },
    orderBy: { createdAt: "desc" },
  });
};

export const findSocialLinkById = (id) => {
  return prisma.socialLink.findUnique({
    where: { id },
  });
};

export const deleteSocialLinkRepo = (id) => {
  return prisma.socialLink.delete({
    where: { id },
  });
};
export const updateSocialLinkRepo = (id, data) => {
  return prisma.socialLink.update({
    where: { id },
    data,
  });
};

import { prisma } from "../config/db.config.js";
import CustomError from "../utils/customErrors.js";
import {
  createSocialLinkRepo,
  findSocialLinksByProfile,
  findSocialLinkById,
  deleteSocialLinkRepo,
  updateSocialLinkRepo,
} from "../repository/socialLink.repository.js";

export const createSocialLinkService = async (userId, body) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  return createSocialLinkRepo(profile.id, body);
};

export const getSocialLinksService = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  return findSocialLinksByProfile(profile.id);
};

export const deleteSocialLinkService = async (userId, socialLinkId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  const socialLink = await findSocialLinkById(socialLinkId);

  if (!socialLink) {
    throw CustomError.notFound("Social link not found");
  }

  if (socialLink.profileId !== profile.id) {
    throw CustomError.forbidden("Access denied");
  }

  return deleteSocialLinkRepo(socialLinkId);
};
export const updateSocialLinkService = async (userId, socialLinkId, body) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  const socialLink = await findSocialLinkById(socialLinkId);

  if (!socialLink) {
    throw CustomError.notFound("Social link not found");
  }

  if (socialLink.profileId !== profile.id) {
    throw CustomError.forbidden("Access denied");
  }

  return updateSocialLinkRepo(socialLinkId, body);
};

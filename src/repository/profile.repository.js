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
export const getProfileByUserId = (userId) => {
  return prisma.profile.findUnique({
    where: { userId },
  });
};
export const findProfileBySlug = (slug) => {
  return prisma.profile.findUnique({
    where: { slug },
    include: {
      careerVision: true,
      experiences: true,
      educations: true,
      certifications: true,
      socialLinks: true,
      skills: {
        include: {
          endorsements: true,
          _count: {
            select: { endorsements: true },
          },
        },
      },
    },
  });
};

export const findProfileWithDetailsByUserId = (userId) => {
  return prisma.profile.findUnique({
    where: { userId },
    include: {
      skills: true,
      experiences: true,
      educations: true,
      careerVision: true,
    },
  });
};

import { prisma } from "../config/db.config.js";

export const createSkillRepo = (data) => {
  return prisma.skill.create({ data });
};

export const findSkillsByProfile = (profileId) => {
  return prisma.skill.findMany({
    where: { profileId },
    include: {
      _count: {
        select: { endorsements: true },
      },
    },
  });
};

export const findSkillById = (id) => {
  return prisma.skill.findUnique({
    where: { id },
    include: {
      endorsements: true,
    },
  });
};

export const deleteSkillRepo = (id) => {
  return prisma.skill.delete({ where: { id } });
};

export const createEndorsementRepo = (data) => {
  return prisma.endorsement.create({ data });
};

export const deleteEndorsementRepo = (userId, skillId) => {
  return prisma.endorsement.delete({
    where: {
      userId_skillId: {
        userId,
        skillId,
      },
    },
  });
};

import { prisma } from "../config/db.config.js";
import CustomError from "../utils/customErrors.js";
import {
  createSkillRepo,
  findSkillsByProfile,
  findSkillById,
  deleteSkillRepo,
  createEndorsementRepo,
  deleteEndorsementRepo,
} from "../repository/skill.repository.js";

export const createSkillService = async (userId, name) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  return createSkillRepo({
    name,
    profileId: profile.id,
  });
};

export const getSkillsService = async (profileId) => {
  return findSkillsByProfile(profileId);
};

export const deleteSkillService = async (userId, skillId) => {
  const skill = await findSkillById(skillId);

  if (!skill) {
    throw CustomError.notFound("Skill not found");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (skill.profileId !== profile.id) {
    throw CustomError.forbidden("Access denied");
  }

  return deleteSkillRepo(skillId);
};

export const endorseSkillService = async (userId, skillId) => {
  const skill = await findSkillById(skillId);

  if (!skill) {
    throw CustomError.notFound("Skill not found");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (skill.profileId === profile.id) {
    throw CustomError.badRequest("You cannot endorse your own skill");
  }

  try {
    return await createEndorsementRepo({
      userId,
      skillId,
    });
  } catch (error) {
    throw CustomError.badRequest("You have already endorsed this skill");
  }
};

export const removeEndorsementService = async (userId, skillId) => {
  try {
    return await deleteEndorsementRepo(userId, skillId);
  } catch (error) {
    throw CustomError.badRequest("Endorsement not found");
  }
};

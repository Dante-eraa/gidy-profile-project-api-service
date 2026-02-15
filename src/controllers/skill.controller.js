import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import {
  createSkillService,
  getSkillsService,
  deleteSkillService,
  endorseSkillService,
  removeEndorsementService,
} from "../services/skill.service.js";

export const createSkill = asyncHandler(async (req, res) => {
  const result = await createSkillService(req.user.id, req.body.name);

  return successResponse(res, {
    statusCode: 201,
    message: "Skill added successfully",
    data: result,
  });
});

export const getSkills = asyncHandler(async (req, res) => {
  const result = await getSkillsService(req.params.profileId);

  return successResponse(res, {
    message: "Skills fetched successfully",
    data: result,
  });
});

export const deleteSkill = asyncHandler(async (req, res) => {
  await deleteSkillService(req.user.id, req.params.id);

  return successResponse(res, {
    message: "Skill deleted successfully",
  });
});

export const endorseSkill = asyncHandler(async (req, res) => {
  await endorseSkillService(req.user.id, req.params.skillId);

  return successResponse(res, {
    message: "Skill endorsed successfully",
  });
});

export const removeEndorsement = asyncHandler(async (req, res) => {
  await removeEndorsementService(req.user.id, req.params.skillId);

  return successResponse(res, {
    message: "Endorsement removed successfully",
  });
});

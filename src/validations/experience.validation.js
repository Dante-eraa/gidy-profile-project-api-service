import Joi from "joi";

export const createExperienceSchema = Joi.object({
  title: Joi.string().required(),
  employmentType: Joi.string().optional(),
  company: Joi.string().required(),
  location: Joi.string().optional(),
  locationType: Joi.string().optional(),
  description: Joi.string().optional(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional().allow(null),
  isCurrentlyWorking: Joi.boolean().optional(),
});

export const updateExperienceSchema = Joi.object({
  title: Joi.string().optional(),
  employmentType: Joi.string().optional(),
  company: Joi.string().optional(),
  location: Joi.string().optional(),
  locationType: Joi.string().optional(),
  description: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional().allow(null),
  isCurrentlyWorking: Joi.boolean().optional(),
});

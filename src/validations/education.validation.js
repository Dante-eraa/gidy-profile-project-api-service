import Joi from "joi";

export const createEducationSchema = Joi.object({
  degree: Joi.string().required(),
  field: Joi.string().optional().allow(null, ""),
  institution: Joi.string().required(),
  location: Joi.string().required(),
  startYear: Joi.number().integer().min(1900).required(),
  endYear: Joi.number().integer().min(1900).optional().allow(null),
  grade: Joi.string().optional().allow(null, ""),
});

export const updateEducationSchema = Joi.object({
  degree: Joi.string().optional(),
  field: Joi.string().optional().allow(null, ""),
  institution: Joi.string().optional(),
  location: Joi.string().optional(),
  startYear: Joi.number().integer().min(1900).optional(),
  endYear: Joi.number().integer().min(1900).optional().allow(null),
  grade: Joi.string().optional().allow(null, ""),
});

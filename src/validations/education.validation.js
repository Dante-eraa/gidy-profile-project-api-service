import Joi from "joi";

export const createEducationSchema = Joi.object({
  degree: Joi.string().required(),
  field: Joi.string().optional().allow(null, ""),
  institution: Joi.string().required(),
  location: Joi.string().required(),
  startYear: Joi.date().required(),
  endYear: Joi.date()
    .optional()
    .allow(null)
    .when("isCurrentlyStudying", {
      is: true,
      then: Joi.valid(null),
      otherwise: Joi.required(),
    }),
  isCurrentlyStudying: Joi.boolean().optional(),
  grade: Joi.string().optional().allow(null, ""),
});

export const updateEducationSchema = Joi.object({
  degree: Joi.string().optional(),
  field: Joi.string().optional().allow(null, ""),
  institution: Joi.string().optional(),
  location: Joi.string().optional(),
  startYear: Joi.date().optional(),
  endYear: Joi.date()
    .optional()
    .allow(null)
    .when("isCurrentlyStudying", {
      is: true,
      then: Joi.valid(null),
      otherwise: Joi.required(),
    }),
  isCurrentlyStudying: Joi.boolean().optional(),
  grade: Joi.string().optional().allow(null, ""),
});

import Joi from "joi";

export const updateProfileSchema = Joi.object({
  fullName: Joi.string().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  headline: Joi.string().optional(),
  location: Joi.string().optional(),
  bio: Joi.string().optional(),
  role: Joi.string().optional(),
});

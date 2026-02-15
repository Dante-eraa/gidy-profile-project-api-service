import Joi from "joi";

export const createSocialLinkSchema = Joi.object({
  platform: Joi.string()
    .valid("LINKEDIN", "GITHUB", "TWITTER", "PORTFOLIO", "OTHER")
    .required(),
  url: Joi.string().uri().required(),
});
export const updateSocialLinkSchema = Joi.object({
  platform: Joi.string()
    .valid("LINKEDIN", "GITHUB", "TWITTER", "PORTFOLIO", "OTHER")
    .optional(),
  url: Joi.string().uri().optional(),
});

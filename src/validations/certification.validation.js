import Joi from "joi";

export const createCertificationSchema = Joi.object({
  title: Joi.string().required(),
  issuer: Joi.string().required(),
  issueDate: Joi.date().required(),
  expiryDate: Joi.date().optional().allow(null),
  certificateUrl: Joi.string().uri().optional().allow(null, ""),
});

export const updateCertificationSchema = Joi.object({
  title: Joi.string().optional(),
  issuer: Joi.string().optional(),
  issueDate: Joi.date().optional(),
  expiryDate: Joi.date().optional().allow(null),
  certificateUrl: Joi.string().uri().optional().allow(null, ""),
});

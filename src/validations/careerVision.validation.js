import Joi from "joi";

export const careerVisionSchema = Joi.object({
  careerGoal: Joi.string().required(),
  growingInto: Joi.string().required(),
  growthSpace: Joi.string().required(),
  inspiredBy: Joi.string().required(),
});

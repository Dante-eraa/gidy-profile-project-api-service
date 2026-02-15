import CustomError from "../utils/customErrors.js";

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((err) => err.message);

      return next(
        CustomError.badRequest("Validation failed", {
          errors,
        }),
      );
    }

    req[property] = value; // sanitized values
    next();
  };
};

export default validate;

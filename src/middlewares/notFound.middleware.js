import CustomError from "../utils/customErrors.js";

const notFound = (req, res, next) => {
  next(CustomError.notFound(`Route ${req.originalUrl} not found`));
};

export default notFound;

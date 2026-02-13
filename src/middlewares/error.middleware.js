import { errorResponse } from "../utils/apiResponse.js";

const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  const statusCode = err.statusCode || 500;

  const message = err.isOperational ? err.message : "Internal Server Error";

  return errorResponse(res, {
    statusCode,
    message,
    data: null,
    metadata: err.metadata || null,
  });
};

export default errorHandler;

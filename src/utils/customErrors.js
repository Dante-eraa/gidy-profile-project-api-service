class CustomError extends Error {
  constructor(
    message = "Something went wrong",
    statusCode = 500,
    metadata = null,
  ) {
    super(message);

    this.statusCode = statusCode;
    this.metadata = metadata;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  // Static helpers for common errors
  static badRequest(message = "Bad Request", metadata = null) {
    return new CustomError(message, 400, metadata);
  }

  static unauthorized(message = "Unauthorized", metadata = null) {
    return new CustomError(message, 401, metadata);
  }

  static forbidden(message = "Forbidden", metadata = null) {
    return new CustomError(message, 403, metadata);
  }

  static notFound(message = "Resource not found", metadata = null) {
    return new CustomError(message, 404, metadata);
  }

  static internal(message = "Internal Server Error", metadata = null) {
    return new CustomError(message, 500, metadata);
  }
}

export default CustomError;

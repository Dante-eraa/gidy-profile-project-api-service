export const successResponse = (
  res,
  { statusCode = 200, message = "Success", data = null, metadata = null } = {},
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    metadata,
  });
};

export const errorResponse = (
  res,
  {
    statusCode = 500,
    message = "Internal Server Error",
    data = null,
    metadata = null,
  } = {},
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data,
    metadata,
  });
};

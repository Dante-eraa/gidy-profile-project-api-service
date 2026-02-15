import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { registerService, loginService } from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerService(req.body);

  return successResponse(res, {
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginService(req.body);

  return successResponse(res, {
    message: "Login successful",
    data: result,
  });
});

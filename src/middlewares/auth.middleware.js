import jwt from "jsonwebtoken";
import appConfig from "../config/app.config.js";
import { prisma } from "../config/db.config.js";
import CustomError from "../utils/customErrors.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw CustomError.unauthorized("No token provided");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, appConfig.jwt.secret);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { profile: true },
    });

    if (!user) {
      throw CustomError.unauthorized("User no longer exists");
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    next(
      CustomError.unauthorized(
        error.name === "JsonWebTokenError"
          ? "Invalid token"
          : error.name === "TokenExpiredError"
            ? "Token expired"
            : error.message,
      ),
    );
  }
};

export default authenticate;

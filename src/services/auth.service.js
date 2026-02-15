import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import CustomError from "../utils/customErrors.js";
import { findUserByEmail, createUser } from "../repository/auth.repository.js";
import slugify from "slugify";
import appConfig from "../config/app.config.js";
import crypto from "crypto";

export const registerService = async ({ email, password, fullName }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw CustomError.badRequest("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const nameParts = fullName.trim().split(" ");

  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
  const baseSlug = slugify(fullName, { lower: true, strict: true });

  const uuid = crypto.randomUUID();

  const shortId = uuid.split("-")[0];

  const slug = `${baseSlug}-${shortId}`;

  const user = await createUser({
    email,
    password: hashedPassword,
    profile: {
      create: {
        fullName,
        firstName,
        lastName,
        slug,
      },
    },
  });

  const accessToken = generateToken({ id: user.id });

  return {
    user: {
      id: user.id,
      email: user.email,
      profile: user.profile,
    },
    accessToken,
  };
};

export const loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw CustomError.unauthorized("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw CustomError.unauthorized("Invalid credentials");
  }

  const accessToken = generateToken({ id: user.id });

  const baseUrl = appConfig.clientUrl;

  return {
    user: {
      id: user.id,
      email: user.email,
      profile: user.profile,
      profileUrl: `${baseUrl}/profile/${user.profile.slug}`,
    },
    accessToken,
  };
};

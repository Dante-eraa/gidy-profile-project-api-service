import { prisma } from "../config/db.config.js";

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });
};

export const createUser = async (data) => {
  return prisma.user.create({
    data,
    include: { profile: true },
  });
};

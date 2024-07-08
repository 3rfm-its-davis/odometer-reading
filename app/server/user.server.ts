import { prisma } from "./prisma.server";

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type GlobalThisType = typeof globalThis;

interface CustomNodeJsGlobal extends GlobalThisType {
  prisma?: PrismaClient;
}

const globalForPrisma = globalThis as CustomNodeJsGlobal;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
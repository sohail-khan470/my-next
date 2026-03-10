import { PrismaClient } from "@prisma/client";

// This ensures that in development, Next.js hot reloads
// don’t create multiple instances
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ["query", "info", "warn", "error"] });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

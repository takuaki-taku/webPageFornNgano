import { PrismaClient } from "@prisma/client"

// PrismaClient は global オブジェクトにキャッシュされ、
// 開発中に不必要な接続を避けるために使用されます
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma

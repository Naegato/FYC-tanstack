import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
// relative because the better auth cli don't find it otherwise
import { PrismaClient } from 'generated/prisma/client.ts'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({
  adapter,
})

export { prisma }
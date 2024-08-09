import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getEvents() {
  const events = await prisma.event.findMany({
    orderBy: {
      date: 'asc',
    },
  })
  return events
}
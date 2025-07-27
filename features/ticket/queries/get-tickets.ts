import type { Ticket } from '@/features/ticket/types'
import { prisma } from '@/lib/prisma'

export async function getTickets(): Promise<Ticket[]> {
  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

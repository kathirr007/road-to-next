import type { Ticket } from '@/features/ticket/types'
import { prisma } from '@/lib/prisma'

export async function getTicket(ticketId: string): Promise<Ticket | null> {
  return await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  })
}

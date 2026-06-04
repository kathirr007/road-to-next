import type { Ticket } from '@prisma/client'
import { prisma } from '@/lib/prisma'

interface GetTicketsParams {
  page?: number
  limit?: number
}

export async function getTickets({ page = 1, limit = 10 }: GetTicketsParams = {}): Promise<{
  tickets: Ticket[]
  meta: {
    currentPage: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
}> {
  const skip = (page - 1) * limit

  const [tickets, totalItems] = await Promise.all([
    prisma.ticket.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.ticket.count(),
  ])

  return {
    tickets,
    meta: {
      currentPage: page,
      pageSize: limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  }
}

import type { Ticket } from '@/features/ticket/types'
import { initialData } from '@/data'

export async function getTicket(ticketId: string): Promise<Ticket | null> {
  await new Promise(resolve => setTimeout(resolve, 2000))

  const foundTicket = initialData.find(ticket => `${ticket.id}` === ticketId)

  // throw new Error('Error fetching ticket details.')

  return new Promise((resolve) => {
    resolve(foundTicket || null)
  })
}

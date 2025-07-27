import type { Ticket } from '@/features/ticket/types'
import { initialData } from '@/data'

export async function getTickets(): Promise<Ticket[]> {
  await new Promise(resolve => setTimeout(resolve, 2000))

  // throw new Error('Error fetching tickets list.')

  return new Promise((resolve) => {
    resolve(initialData)
  })
}

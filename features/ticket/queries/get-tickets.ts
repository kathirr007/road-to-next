import type { Ticket } from '@/features/ticket/types'
import { initialData } from '@/data'

export async function getTickets(): Promise<Ticket[]> {
  await new Promise(resolve => setTimeout(resolve, 5000))

  return new Promise((resolve) => {
    resolve(initialData)
  })
}

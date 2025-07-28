'use server'

import { revalidatePath } from 'next/cache'

import { redirect } from 'next/navigation'
import z from 'zod'
import { prisma } from '@/lib/prisma'
import { ticketDetailsPath, ticketsPath } from '@/paths'

const upsertTicketSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string().min(10).max(1000),
})

export async function upsertTicket(id: string | undefined, _actionState: { message: string, payload?: FormData }, formData: FormData) {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    })

    await prisma.ticket.upsert({
      where: {
        id: formData.get('id') as string || '',
      },
      create: data,
      update: data,
    })
  }
  catch (error) {
    console.error('Error upserting ticket:', error)
    return {
      message: 'Failed to upsert ticket. Please try again later.',
      payload: formData,
    }
  }

  revalidatePath(ticketsPath())

  if (id) {
    redirect(`${ticketDetailsPath(id)}`)
  }

  return {
    message: 'Ticket successfully upserted',
  }
}

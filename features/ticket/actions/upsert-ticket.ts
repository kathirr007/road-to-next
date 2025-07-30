'use server'

import type { ActionState } from '@/components/form/utils/to-action-state'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import z from 'zod'
import { fromErrorToActionState, toActionState } from '@/components/form/utils/to-action-state'
import { prisma } from '@/lib/prisma'
import { ticketDetailsPath, ticketsPath } from '@/paths'

const upsertTicketSchema = z.object({
  title: z.string().min(2).max(100),
  content: z.string().min(10).max(1000),
})

export async function upsertTicket(id: string | undefined, _actionState: ActionState, formData: FormData) {
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
    // console.error('Error upserting ticket:', error)

    return fromErrorToActionState(error, formData)
  }

  revalidatePath(ticketsPath())

  if (id) {
    redirect(`${ticketDetailsPath(id)}`)
  }

  return toActionState('SUCCESS', 'Ticket created successfully.')
}

'use server'

import { revalidatePath } from 'next/cache'

import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ticketDetailsPath, ticketsPath } from '@/paths'

export async function upsertTicket(id: string | undefined, formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  }

  await prisma.ticket.upsert({
    where: {
      id: formData.get('id') as string || '',
    },
    create: data,
    update: data,
  })

  revalidatePath(ticketsPath())

  if (id) {
    redirect(`${ticketDetailsPath(id)}`)
  }
}

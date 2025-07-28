'use client'

import type { Ticket } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateTicket } from '@/features/ticket/actions/update-ticket'
import { ticketsPath } from '@/paths'

interface TicketUpdateFormProps {
  ticket: Ticket
}

function TicketUpdateForm({ ticket }: TicketUpdateFormProps) {
  const router = useRouter()

  return (
    <form action={updateTicket} className="flex flex-col gap-y-2">
      <Input name="id" defaultValue={ticket.id} hidden />
      <Label htmlFor="title">
        Title
      </Label>
      <Input id="title" name="title" defaultValue={ticket.title} />
      <Label htmlFor="content">
        Content
      </Label>
      <Textarea id="content" name="content" defaultValue={ticket.content} />
      <div className="flex w-full gap-x-2">
        <Button type="button" onClick={() => router.back()} asChild variant="outline" className="flex-1 cursor-pointer">
          <Link href={ticketsPath()}>
            Back
          </Link>
        </Button>
        <Button type="submit" className="flex-1  cursor-pointer">Update</Button>
      </div>
    </form>
  )
}

export default TicketUpdateForm

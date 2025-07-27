import type { Ticket } from '@prisma/client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateTicket } from '@/features/ticket/actions/update-ticket'

interface TicketUpdateFormProps {
  ticket: Ticket
}

function TicketUpdateForm({ ticket }: TicketUpdateFormProps) {
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
      <Button type="submit" className="cursor-pointer">Update</Button>
    </form>
  )
}

export default TicketUpdateForm

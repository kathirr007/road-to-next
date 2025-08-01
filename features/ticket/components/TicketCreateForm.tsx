import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createTicket } from '@/features/ticket/actions/create-ticket'

function TicketCreateForm() {
  return (
    <form action={createTicket} className="flex flex-col gap-y-2">
      <Label htmlFor="title">
        Title
      </Label>
      <Input id="title" name="title" />
      <Label htmlFor="content">
        Content
      </Label>
      <Textarea id="content" name="content" />
      <Button type="submit" className="cursor-pointer">Create</Button>
    </form>
  )
}

export default TicketCreateForm

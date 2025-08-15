'use client'

import type { Ticket } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useActionState } from 'react'
import { toast } from 'sonner'
import FieldError from '@/components/form/FieldError'
import { useActionFeedback } from '@/components/form/hooks/use-action-feedback'
import SubmitButton from '@/components/form/SubmitButton'
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { upsertTicket } from '@/features/ticket/actions/upsert-ticket'
import { ticketsPath } from '@/paths'

interface TicketUpsertFormProps {
  ticket?: Ticket
}

function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const router = useRouter()

  const [actionState, action] = useActionState(upsertTicket.bind(null, ticket?.id), EMPTY_ACTION_STATE)

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      // console.log('Ticket upserted successfully:', actionState.message)
      toast.success(actionState.message, {
        description: 'Your ticket has been successfully created or updated.',
      })
    },
    onError: ({ actionState }) => {
      // console.error('Error upserting ticket:', actionState.message)
      toast.error(actionState.message, {
        description: 'There was an error while processing your request. Please check the form for errors.',
      })
    },
  })

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <Input name="id" defaultValue={ticket?.id} hidden />
      <Label htmlFor="title">
        Title
      </Label>
      <Input id="title" name="title" defaultValue={(actionState.payload?.get('title') as string) ?? ticket?.title} />
      <FieldError actionState={actionState} name="title" />
      <Label htmlFor="content">
        Content
      </Label>
      <Textarea id="content" name="content" defaultValue={(actionState.payload?.get('content') as string) ?? ticket?.content} />
      <FieldError actionState={actionState} name="content" />
      <div className="flex w-full gap-x-2">
        {ticket && (
          <Button type="button" onClick={() => router.back()} asChild variant="outline" className="flex-1 cursor-pointer">
            <Link href={ticketsPath()}>
              Back
            </Link>
          </Button>
        )}
        <SubmitButton label={ticket ? 'Update Ticket' : 'Create Ticket'} />

      </div>
      {actionState.message}
    </form>
  )
}

export default TicketUpsertForm

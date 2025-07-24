import type { Ticket } from '@/features/ticket/types'
import Link from 'next/link'
import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TICKET_ICONS } from '@/features/ticket/constants'
import { ticketDetailsPath } from '@/paths'

interface TicketItemProps {
  ticket: Ticket
}

function TicketItem({ ticket }: TicketItemProps) {
  return (
    <Card className="w-full max-w-[420px] gap-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2">
          <span>
            {TICKET_ICONS[ticket.status] || '❓'}
          </span>
          <span className="truncate">{ticket.title}</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <span className="line-clamp-3 whitespace-break-spaces">
          {ticket.content}
        </span>
      </CardContent>

      <CardFooter>
        <Link href={ticketDetailsPath(ticket.id)} className="underline text-teal-500 font-semibold">
          View details
        </Link>
      </CardFooter>
    </Card>
  )
}

export { TicketItem }

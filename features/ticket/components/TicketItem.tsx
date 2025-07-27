import type { Ticket } from '@prisma/client'
import clsx from 'clsx'
import { LucideSquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TICKET_ICONS } from '@/features/ticket/constants'
import { ticketDetailsPath } from '@/paths'

interface TicketItemProps {
  ticket: Ticket
  isDetail?: boolean
}

function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const detailButton = (
    <>
      <Button asChild variant="outline" size="icon">
        <Link href={ticketDetailsPath(ticket.id)}>
          <LucideSquareArrowOutUpRight />
        </Link>
      </Button>
    </>
  )

  return (
    <div className={clsx('w-full flex gap-x-2', { 'max-w-[580px]': isDetail, 'max-w-[420px]': !isDetail })}>
      <Card className="w-full gap-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <span>
              {TICKET_ICONS[ticket.status] || '❓'}
            </span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <span className={clsx('whitespace-break-spaces', { 'line-clamp-3': !isDetail })}>
            {ticket.content}
          </span>
        </CardContent>
      </Card>
      {
        isDetail ? null : detailButton
      }
    </div>
  )
}

export { TicketItem }

import type { Ticket } from '@prisma/client'
import clsx from 'clsx'
import { LucideArrowLeft, LucidePencil, LucideSquareArrowOutUpRight, LucideTrash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { deleteTicket } from '@/features/ticket/actions/delete-ticket'
import { TICKET_ICONS } from '@/features/ticket/constants'
import { ticketDetailsPath, ticketEditPath, ticketsPath } from '@/paths'

interface TicketItemProps {
  ticket: Ticket
  isDetail?: boolean
}

function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const backButton = (
    <>
      <Button asChild variant="outline" size="icon">
        {/* prefetch prop will enable next prefetching for all link components used */}
        <Link prefetch href={ticketsPath()}>
          <LucideArrowLeft className="h-4 w-4" />
        </Link>
      </Button>
    </>
  )
  const detailButton = (
    <>
      <Button asChild variant="outline" size="icon">
        {/* prefetch prop will enable next prefetching for all link components used */}
        <Link prefetch href={ticketDetailsPath(ticket.id)}>
          <LucideSquareArrowOutUpRight className="h-4 w-4" />
        </Link>
      </Button>
    </>
  )
  const editButton = (
    <>
      <Button asChild variant="outline" size="icon">
        {/* prefetch prop will enable next prefetching for all link components used */}
        <Link prefetch href={ticketEditPath(ticket.id)}>
          <LucidePencil className="h-4 w-4" />
        </Link>
      </Button>
    </>
  )
  const deleteButton = (
    <form action={deleteTicket.bind(null, ticket.id)}>
      <Button variant="outline" size="icon" className="cursor-pointer">
        <LucideTrash2 className="h-4 w-4" />
      </Button>
    </form>
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
      <div className="flex flex-col gap-y-2">
        {
          isDetail
            ? (
                <>
                  {backButton}
                  {editButton}
                  {deleteButton}
                </>
              )
            : (
                <>
                  {detailButton}
                  {editButton}
                </>
              )
        }
      </div>
    </div>
  )
}

export { TicketItem }

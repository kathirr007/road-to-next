import Link from 'next/link'
import React from 'react'
import { Placeholder } from '@/components/Placeholder'
import { Button } from '@/components/ui/button'
import { initialData } from '@/data'
import { TicketItem } from '@/features/ticket/components/TicketItem'
import { ticketsPath } from '@/paths'

export interface TicketPageProps {
  params: Promise<{
    ticketId: string
  }>
}

async function TicketDetails({ params }: TicketPageProps) {
  const { ticketId } = await params

  const foundTicket = initialData.find(ticket => ticket.id.toString() === ticketId)

  if (!foundTicket) {
    return (
      <div className="flex flex-1">
        <Placeholder
          label="Ticket not found"
          button={(
            <Button asChild variant="outline">
              <Link href={ticketsPath()}>
                Back to tickets
              </Link>
            </Button>
          )}
        />
      </div>
    )
  }

  return (
    <div className="flex justify-center animate-slide-in-from-left">
      <TicketItem ticket={foundTicket} isDetail />
    </div>
  )
}

export default TicketDetails

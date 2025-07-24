import Link from 'next/link'
import React from 'react'
import { Placeholder } from '@/components/Placeholder'
import { Button } from '@/components/ui/button'
import { initialData } from '@/data'
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
    <div className="animate-slide-in-from-left">
      <Button>
        <Link href={ticketsPath()} className="underline text-teal-500 font-semibold">
          Back to tickets
        </Link>
      </Button>

      <h2>
        Ticket Details (
        {ticketId}
        )
      </h2>
      <h2>{foundTicket.title}</h2>
      <p>{foundTicket.content}</p>
    </div>
  )
}

export default TicketDetails

import Link from 'next/link'
import React from 'react'
import Button from '@/components/Button'
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
      <>
        <Button>
          <Link href={ticketsPath()} className="underline text-teal-500 font-semibold">
            Back to tickets
          </Link>
        </Button>
        <div>Ticket not found</div>
      </>
    )
  }

  return (
    <div>
      <Button>
        <Link href={ticketsPath()} className="underline text-teal-500 font-semibold">
          Back to tickets
        </Link>
      </Button>

      <h1>
        Ticket Details (
        {ticketId}
        )
      </h1>
      <h2>{foundTicket.title}</h2>
      <p>{foundTicket.content}</p>
    </div>
  )
}

export default TicketDetails

import React from 'react'
import { TicketItem } from '@/features/ticket/components/TicketItem'
import { getTickets } from '@/features/ticket/queries/get-tickets'

async function TicketsList() {
  const tickets = await getTickets()

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">

      { tickets.map(ticket => (
        <TicketItem key={ticket.id} ticket={ticket} />
      )) }

    </div>
  )
}

export default TicketsList

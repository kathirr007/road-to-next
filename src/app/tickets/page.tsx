import Link from 'next/link'
import React from 'react'
import { initialData } from '@/data'
import { ticketDetailsPath } from '@/paths'

function ticketsPage() {
  return (
    <div>
      <h1>Tickets list page</h1>
      <p>Here you can find a list of all tickets.</p>

      { initialData.map(ticket => (
        <div key={ticket.id}>
          <Link href={ticketDetailsPath(ticket.id)} className="underline text-teal-500 font-semibold">
            <h2>{ticket.title}</h2>
          </Link>
          <p>{ticket.content}</p>
          <p>
            Status:
            {ticket.status}
          </p>
          <hr />
        </div>
      )) }
    </div>
  )
}

export default ticketsPage

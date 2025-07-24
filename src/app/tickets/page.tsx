import Link from 'next/link'
import React from 'react'
import { CheckIcon, DocumentIcon, PencilIcon } from '@/components/Icons'
import { initialData } from '@/data'
import { ticketDetailsPath } from '@/paths'

const TICKET_ICONS = {
  OPEN: <DocumentIcon />,
  IN_PROGRESS: <PencilIcon />,
  DONE: <CheckIcon />,
}

function ticketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tickets list page</h2>
        <p className="text-sm text-muted-foreground">
          All your tickets at one place. Click on a ticket to view its details.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">

        { initialData.map(ticket => (
          <div key={ticket.id} className="w-full max-w-[420px] p-4 border border-slate-400 rounded ">
            <div>
              {TICKET_ICONS[ticket.status] || '❓'}
            </div>
            <h3 className="text-lg font-semibold truncate">{ticket.title}</h3>

            <p className="truncate text-sm text-slate-600">
              {ticket.content}
            </p>

            <Link href={ticketDetailsPath(ticket.id)} className="underline text-teal-500 font-semibold">
              View details
            </Link>
          </div>
        )) }
      </div>
    </div>
  )
}

export default ticketsPage

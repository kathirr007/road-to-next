import { LucideCheckCircle, LucideFile, LucideSquarePen } from 'lucide-react'
import Link from 'next/link'

import { Heading } from '@/components/Heading'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { initialData } from '@/data'
import { ticketDetailsPath } from '@/paths'

const TICKET_ICONS = {
  OPEN: <LucideFile />,
  IN_PROGRESS: <LucideSquarePen />,
  DONE: <LucideCheckCircle />,
}

function ticketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">

      <Heading title="Tickets list page" description="All your tickets at one place. Click on a ticket to view its details." />

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">

        { initialData.map(ticket => (
          <Card key={ticket.id} className="w-full max-w-[420px] gap-4">
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
        )) }
      </div>
    </div>
  )
}

export default ticketsPage

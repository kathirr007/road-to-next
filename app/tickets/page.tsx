import { Heading } from '@/components/Heading'
import { initialData } from '@/data'
import { TicketItem } from '@/features/ticket/components/TicketItem'

function ticketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">

      <Heading title="Tickets list page" description="All your tickets at one place. Click on a ticket to view its details." />

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">

        { initialData.map(ticket => (
          <TicketItem key={ticket.id} ticket={ticket} />
        )) }
      </div>
    </div>
  )
}

export default ticketsPage

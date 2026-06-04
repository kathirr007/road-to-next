import { getTickets } from '@/features/ticket/queries/get-tickets'
import { TicketItem } from './TicketItem'

interface TicketsListProps {
  currentPage?: number
  searchParams?: Record<string, string | string[]>
}

async function TicketsList({ currentPage = 1, searchParams = {} }: TicketsListProps) {
  const { tickets } = await getTickets({ page: currentPage, limit: 5 })

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      {tickets.map(ticket => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  )
}

export default TicketsList

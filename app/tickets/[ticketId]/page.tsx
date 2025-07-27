import Link from 'next/link'
import { Placeholder } from '@/components/Placeholder'
import { Button } from '@/components/ui/button'
import { TicketItem } from '@/features/ticket/components/TicketItem'
import { getTicket } from '@/features/ticket/queries/get-ticket'
import { ticketsPath } from '@/paths'

export interface TicketPageProps {
  params: Promise<{
    ticketId: string
  }>
}

async function TicketDetails({ params }: TicketPageProps) {
  const { ticketId } = await params

  // const foundTicket = initialData.find(ticket => ticket.id.toString() === ticketId)
  const foundTicket = await getTicket(ticketId)

  if (!foundTicket) {
    // notFound()
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

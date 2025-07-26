export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE'

export interface Ticket {
  id: string | number
  title: string
  content: string
  status: TicketStatus
}

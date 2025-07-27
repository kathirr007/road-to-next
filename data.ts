import type { Ticket } from '@/features/ticket/types'

export const initialData: Ticket[] = [
  {
    id: '1',
    title: 'Ticket 1',
    content: 'Description for ticket 1',
    status: 'DONE',
  },
  {
    id: '2',
    title: 'Ticket 2',
    content: 'Description for ticket 2',
    status: 'IN_PROGRESS',
  },
  {
    id: '3',
    title: 'Ticket 3',
    content: 'Description for ticket 3',
    status: 'DONE',
  },
  {
    id: '4',
    title: 'Ticket 4',
    content: 'Description for ticket 4',
    status: 'OPEN',
  },
]

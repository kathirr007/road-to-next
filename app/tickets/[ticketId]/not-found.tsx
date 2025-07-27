import Link from 'next/link'
import React from 'react'
import { Placeholder } from '@/components/Placeholder'
import { Button } from '@/components/ui/button'
import { ticketsPath } from '@/paths'

function NotFound() {
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

export default NotFound

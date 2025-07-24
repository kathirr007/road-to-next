'use client'

import clsx from 'clsx'
import { LucideKanbanSquare } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'
import { aboutPath, homePath, ticketsPath } from '@/paths'

export function HeaderNav() {
  const pathname = usePathname()

  return (
    <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
      <div>
        <Link href={homePath()} className={buttonVariants({ variant: 'ghost' })}>
          <LucideKanbanSquare />
          <h2 className="text-lg font-semibold">The Road to Tickets</h2>
        </Link>
      </div>
      <div className="flex gap-4">
        <Link href={aboutPath()} className={buttonVariants({ variant: pathname === aboutPath() ? 'default' : 'outline' })}>
          About
        </Link>
        <Link href={ticketsPath()} className={clsx(buttonVariants({ variant: pathname === ticketsPath() ? 'default' : 'outline' }))}>
          Tickets
        </Link>
      </div>
    </nav>
  )
}

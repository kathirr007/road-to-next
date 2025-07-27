import clsx from 'clsx'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface CardCompactProps {
  content: React.ReactNode
  title: string
  description: string
  footer?: React.ReactNode
  className?: string
}

function CardCompact({ content, title, description, footer, className }: CardCompactProps) {
  return (
    <Card className={clsx('w-full max-w-[420px] justify-center self-center', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {content}
      </CardContent>
      {
        footer && (
          <CardFooter>
            {footer}
          </CardFooter>
        )
      }
    </Card>
  )
}

export default CardCompact

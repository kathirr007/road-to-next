import { LucideMessageSquareWarning } from 'lucide-react'
import React from 'react'

interface PlaceholderProps {
  label: string
  icon?: React.ReactElement
  button?: React.ReactElement
}

const defaultIcon = <LucideMessageSquareWarning className="w-12 h-12 text-muted-foreground" />
const defaultButton = <div className="h-10" />

function Placeholder({ label, icon = defaultIcon, button = defaultButton }: PlaceholderProps) {
  return (
    <div className="flex flex-1 self-center flex-col items-center justify-center gap-y-2 ">
      {icon}
      <h2>
        {label}
      </h2>
      {
        button
      }
    </div>
  )
}

export { Placeholder }

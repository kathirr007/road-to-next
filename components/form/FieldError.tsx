import type { ActionState } from '@/components/form/utils/to-action-state'
import React from 'react'

export interface FieldErrorProps {
  actionState: ActionState
  name: string
}

function FieldError({ actionState, name }: FieldErrorProps) {
  return (
    <span>
      {actionState.fieldErrors?.[name] && actionState.fieldErrors[name].map(error => (
        <p key={error} className="text-red-500 text-sm animate-fade-in-from-top">
          {error}
        </p>
      ))}
    </span>
  )
}

export default FieldError

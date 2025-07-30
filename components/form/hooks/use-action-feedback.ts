import type { ActionState } from '@/components/form/utils/to-action-state'
import { useEffect, useRef } from 'react'

interface OnArgs {
  actionState: ActionState
}

interface UseActionFeedbackOptions {
  onSuccess?: (onArgs: OnArgs) => void
  onError?: (onArgs: OnArgs) => void
}

export function useActionFeedback(actionState: ActionState, options: UseActionFeedbackOptions) {
  const prevTimestamp = useRef(actionState.timestamp)
  const isUpdate = prevTimestamp.current !== actionState.timestamp

  useEffect(() => {
    if (!isUpdate)
      return
    // Only call the callbacks if the actionState has changed
    if (actionState.status === 'SUCCESS' && options.onSuccess) {
      options.onSuccess({ actionState })
    }
    else if (actionState.status === 'ERROR' && options.onError) {
      options.onError({ actionState })
    }

    prevTimestamp.current = actionState.timestamp
  }, [actionState, options, isUpdate])
}

import z from 'zod'

export interface ActionState {
  message: string
  timestamp?: number
  payload?: FormData
  fieldErrors?: Record<string, string[] | undefined>
  status?: 'SUCCESS' | 'ERROR'
}

export const EMPTY_ACTION_STATE: ActionState = { message: '', fieldErrors: {}, timestamp: Date.now() }

export function fromErrorToActionState(error: unknown, formData: FormData): ActionState {
  if (error instanceof z.ZodError) {
    const errors = JSON.parse(error.message)
    // If the error is a Zod validation error, return first error message
    console.error('Zod validation error:', errors[0])
    return {
      status: 'ERROR',
      message: '',
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    }
  }
  else if (error instanceof Error) {
    // If the error is a generic Error, return its message
    return {
      status: 'ERROR',
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    }
  }
  // For any other type of error, return a generic message
  return {
    status: 'ERROR',
    message: 'An unexpected error occurred. Please try again later.',
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now(),
  }
}

export function toActionState(status: ActionState['status'], message: string): ActionState {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
  }
}

import { AxiosError } from 'axios'
import { ApiErrorResponse } from '@/types'

export const extractErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error

  if (error && typeof error === 'object') {
    const err = error as AxiosError<ApiErrorResponse>
    const msg = err.response?.data?.message

    if (Array.isArray(msg)) return msg[0]
    return msg ?? 'An unexpected error occurred'
  }

  return 'Something went wrong'
}
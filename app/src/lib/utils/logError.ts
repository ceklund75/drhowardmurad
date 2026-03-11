'use server'
import logger from '@/lib/logger'

export async function logClientError(
  error: { message: string; digest?: string },
  context: Record<string, unknown>,
) {
  logger.error(
    { ...context, errorMessage: error.message, digest: error.digest },
    'Client error boundary triggered',
  )
}

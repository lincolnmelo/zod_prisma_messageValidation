import type { Request, Response, NextFunction } from 'express'
import { CustomError } from '../utils/HttpExceptions'
import { Prisma } from '@prisma/client'
import { apiLogger } from '../config/apiLogger'

const ErrorFactory = (err: Error, res: Response) => {
  if (err instanceof CustomError) {
    const { statusCode, stack, isLogging, errors } = err
    if (isLogging) {
      const logMessage = JSON.stringify({ statusCode, errors, stack }, null, 2)
      console.log(logMessage)
    }
    apiLogger.error('[ErrorFactory CustomError]', err)
    return res.status(statusCode).send({ errors })
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.log(JSON.stringify(err, null, 2))
    apiLogger.error('[ErrorFactory Prisma.PrismaClientKnownRequestError]', err)
    return res.status(400).send({ errors: [{ message: 'Bad Request' }] })
  }
  return null
}

const ErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const handledError = ErrorFactory(err, res)
  if (!handledError) {
    const setError = JSON.stringify(`Unhandled error: ${err}`, null, 2)
    console.log(setError)
    apiLogger.error('[ErrorHandler]', err)
    return res
      .status(500)
      .send({ errors: [{ message: 'Internal server error' }] })
  }
}

export default ErrorHandler
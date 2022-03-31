import { Request, Response, NextFunction } from 'express'

import { AppError } from './AppError'

export const ErrorHandler = (err: Error, _: Request, response: Response, __: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    })
  }

  console.error(err)

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
    stack: err.stack,
  })
}

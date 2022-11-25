import { ServerError } from '@/presentation/errors/server-error'
import { HttpResponse } from '@/presentation/protocols'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack as string)
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

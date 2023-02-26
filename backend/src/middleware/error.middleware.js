import { CustomError } from '../app/error.js'

export const handleError = async (err, req, res, next) => {
  console.log({ err })
  if (res && res.headersSent) {
    return next(err)
  }
  let code = 500
  if (err instanceof CustomError) {
    code = err.getCode()
  }
  return (
    res &&
    res.status(code).send({
      message: err?.message,
      status: 'error',
      statusCode: err.statusCode
    })
  )
}

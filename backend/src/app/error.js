export class CustomError extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
  getCode() {
    return 400
  }
}

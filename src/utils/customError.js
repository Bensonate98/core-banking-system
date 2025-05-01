class AppError extends Error {
  constructor(message, statusCode, errorType) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.name = 'AppError';

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;

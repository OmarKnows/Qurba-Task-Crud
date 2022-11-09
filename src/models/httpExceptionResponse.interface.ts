//interface for handling the exception response implemented in the interceptor "allExceptions.filter.ts"

export interface HttpExceptionResponse {
  statusCode: number;
  message: string;
  error: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
}

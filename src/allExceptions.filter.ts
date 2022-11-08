import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CustomHttpExceptionResponse,
  HttpExceptionResponse,
} from './interfaces/httpExceptionResponse.interface';

@Catch()
export class allExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      errorMessage =
        (errorResponse as HttpExceptionResponse).error || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Internal server error occurred';
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    response.status(status).json(errorResponse);
  }

  private getErrorResponse(
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): CustomHttpExceptionResponse {
    return {
      statusCode: status,
      error: errorMessage,
      path: request.url,
      method: request.method,
      timeStamp: new Date(),
    };
  }
}

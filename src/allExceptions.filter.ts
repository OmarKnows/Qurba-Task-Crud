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
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    let status: HttpStatus;
    let msg: string;
    let err: string;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();

      status = exception.getStatus();
      msg = (errorResponse as HttpExceptionResponse).message
      err = (errorResponse as HttpExceptionResponse).error || exception.message;

    } else {
      switch(exception.code){
        case 11000:
          status = HttpStatus.BAD_REQUEST;
          msg = `${exception.keyValue.uniqueName} already exists`
          err = 'Bad Request'
          break;
        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          err = 'Internal server error occurred: ';
      }   
    }

    const errorResponse = this.getErrorResponse(status, err, request, msg);
    response.status(status).json(errorResponse);
  }

  private getErrorResponse(
    status: HttpStatus,
    err: string,
    request: Request,
    msg: string
  ): CustomHttpExceptionResponse {
    return {
      statusCode: status,
      error: err,
      message: msg,
      path: request.url,
      method: request.method,
      timeStamp: new Date(),
    };
  }
}

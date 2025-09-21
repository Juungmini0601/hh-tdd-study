import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse } from '../response.dto';
import { ERROR_CODE } from '../../../../domain/exception/error.code';
import { BaseException } from 'src/domain/exception/exception';

type ExceptionHandler = (exception: unknown, response: any) => any;

/**
 * 전역 예외 처리 필터
 * - 모든 처리되지 않은 예외를 캐치하여 일관된 응답 형식 제공
 * - ValidationPipe의 BadRequestException, HttpException, Error, 알 수 없는 예외 등을 처리
 */
@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionHandler.name);
  private readonly exceptionHandlers: Map<Function, ExceptionHandler>;

  constructor() {
    const handlers = new Map<Function, ExceptionHandler>();

    handlers.set(BaseException, this.handleBaseException.bind(this));

    handlers.set(
      BadRequestException,
      this.handleValidationException.bind(this), // exception handler의 this 변경
    );

    handlers.set(
      UnauthorizedException,
      this.handleUnauthorizedException.bind(this),
    );

    this.exceptionHandlers = handlers;
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const httpMethod = ctx.getRequest().method;
    const httpUrl = ctx.getRequest().url;
    const httpBody = ctx.getRequest().body;

    this.logger.debug(`${httpMethod} ${httpUrl}`);
    this.logger.debug(`request body: ${JSON.stringify(httpBody)}`);

    for (const [ExceptionCtor, handler] of this.exceptionHandlers) {
      if (exception instanceof (ExceptionCtor as any)) {
        return handler(exception, response);
      }
    }

    return this.handleUnknownError(exception, response);
  }

  private handleUnauthorizedException(ex: unknown, response: any) {
    const exception = ex as UnauthorizedException;
    const status = exception.getStatus();
    const body = ApiResponse.error(
      exception.message,
      null,
      ERROR_CODE.UNAUTHORIZED_EXCEPTION,
    );
    return response.status(status).json(body);
  }

  // BaseException
  private handleBaseException(ex: unknown, response: any) {
    const exception = ex as BaseException;
    const status = HttpStatus.BAD_REQUEST;

    const body = ApiResponse.error(
      exception.message,
      null,
      exception.errorCode,
    );

    this.logger.debug(JSON.stringify(body));
    return response.status(status).json(body);
  }

  // BadRequestException (ValidationPipe)
  private handleValidationException(ex: unknown, response: any) {
    const exception = ex as BadRequestException;
    const status = exception.getStatus();
    const res = exception.getResponse() as {
      message: string | string[];
      error?: string;
    };

    const messages = Array.isArray(res.message)
      ? res.message.join(', ')
      : String(res.message);
    const body = ApiResponse.error(messages, ERROR_CODE.VALIDATION_EXCEPTION);

    this.logger.debug(JSON.stringify(body));
    return response.status(status).json(body);
  }

  // Internal Server Error
  private handleUnknownError(_ex: unknown, response: any) {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const body = ApiResponse.error(
      '서버 오류가 발생했습니다.',
      ERROR_CODE.INTERNAL_EXCEPTION,
    );

    this.logger.error(_ex);
    return response.status(status).json(body);
  }
}

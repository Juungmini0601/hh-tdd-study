export class BaseException extends Error {
  errorCode: string;

  constructor(message: string, errorCode: string) {
    super(message);
    this.errorCode = errorCode;
  }
}

export class DuplicateException extends BaseException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode);
  }
}

export class NotFoundException extends BaseException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode);
  }
}

export class PasswordMismatchException extends BaseException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode);
  }
}

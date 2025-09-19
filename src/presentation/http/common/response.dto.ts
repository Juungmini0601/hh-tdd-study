import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty({
    description: '성공 여부',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '메시지',
    example: 'success',
  })
  message: string;

  @ApiProperty({
    description: '데이터',
    example: {},
  })
  data?: T;

  @ApiProperty({
    description: '에러 코드',
    example: 'E0001',
  })
  errorCode?: string;

  constructor(success: boolean, message: string, data?: T, errorCode?: string) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.errorCode = errorCode;
  }

  static success<T>(data?: T, message: string = '성공'): ApiResponse<T> {
    return new ApiResponse(true, message, data);
  }

  static error<T>(
    message: string,
    data?: T,
    errorCode?: string,
  ): ApiResponse<T> {
    return new ApiResponse(false, message, data, errorCode);
  }
}

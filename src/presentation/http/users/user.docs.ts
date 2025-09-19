import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponse as ApiResponseDto } from '../common/response.dto';
import { RegisterUserResponse } from './user.dto';

export function ApiRegisterUser() {
  return applyDecorators(
    ApiOperation({
      summary: '회원가입',
      description: '회원가입 API',
    }),
    ApiResponse({
      status: 200,
      description: '회원가입 성공',
      type: RegisterUserResponse,
    }),
    ApiResponse({
      status: 400,
      description: '회원가입 실패',
    }),
  );
}

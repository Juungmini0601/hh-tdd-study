import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponse as ApiResponseDto } from '../common/response.dto';
import { LoginResponse } from './auth.dto';

export function ApiLogin() {
  return applyDecorators(
    ApiOperation({ summary: '로그인', description: '로그인 API' }),
    ApiResponse({
      status: 200,
      description: '로그인 성공',
      type: ApiResponseDto<LoginResponse>,
    }),
    ApiResponse({ status: 400, description: '로그인 실패' }),
  );
}

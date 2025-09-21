import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponse as ApiResponseDto } from '../common/response.dto';
import { CreatePostResponse, GetPostResponse } from './post.dto';

export function ApiCreatePost() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({ summary: '게시글 생성', description: '게시글 생성 API' }),
    ApiResponse({
      status: 200,
      description: '게시글 생성 성공',
      type: ApiResponseDto<CreatePostResponse>,
    }),
    ApiResponse({ status: 401, description: '인증 실패' }),
    ApiResponse({ status: 400, description: '요청 값 검증 실패' }),
  );
}

export function ApiGetPost() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({ summary: '게시글 조회', description: '게시글 조회 API' }),
    ApiResponse({
      status: 200,
      description: '게시글 조회 성공',
      type: ApiResponseDto<GetPostResponse>,
    }),
  );
}

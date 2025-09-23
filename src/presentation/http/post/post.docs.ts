import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponse as ApiResponseDto } from '../common/response.dto';
import {
  CreatePostResponse,
  DeletePostResponse,
  GetPostResponse,
  GetPostsResponse,
  UpdatePostResponse,
} from './post.dto';

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

export function ApiUpdatePost() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({ summary: '게시글 수정', description: '게시글 수정 API' }),
    ApiResponse({
      status: 200,
      description: '게시글 수정 성공',
      type: ApiResponseDto<UpdatePostResponse>,
    }),
    ApiResponse({ status: 400, description: '요청 값 검증 실패' }),
    ApiResponse({ status: 401, description: '인증 실패' }),
    ApiResponse({ status: 403, description: '권한 없는 유저' }),
  );
}

export function ApiDeletePost() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({ summary: '게시글 삭제', description: '게시글 삭제 API' }),
    ApiResponse({
      status: 200,
      description: '게시글 삭제 성공',
      type: ApiResponseDto<DeletePostResponse>,
    }),
    ApiResponse({ status: 400, description: '요청 값 검증 실패' }),
    ApiResponse({ status: 401, description: '인증 실패' }),
    ApiResponse({ status: 403, description: '권한 없는 유저' }),
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
    ApiResponse({ status: 400, description: '요청 값 검증 실패' }),
  );
}

export function ApiGetPosts() {
  return applyDecorators(
    ApiOperation({
      summary: '게시글 목록 조회',
      description: '게시글 목록 조회 API',
    }),
    ApiResponse({
      status: 200,
      description: '게시글 목록 조회 성공',
      type: ApiResponseDto<GetPostsResponse>,
    }),
  );
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreatePostRequest {
  @ApiProperty({ description: '게시글 제목', example: '첫 번째 게시글' })
  @IsNotEmpty({ message: '제목은 필수입니다.' })
  @Length(1, 100, { message: '제목은 1자 이상 100자 이하여야 합니다.' })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '안녕하세요, 첫 글입니다.',
  })
  @IsNotEmpty({ message: '내용은 필수입니다.' })
  content: string;
}

export class UpdatePostRequest {
  @ApiProperty({ description: '게시글 제목', example: '첫 번째 게시글' })
  @IsNotEmpty({ message: '제목은 필수입니다.' })
  @Length(1, 100, { message: '제목은 1자 이상 100자 이하여야 합니다.' })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '안녕하세요, 첫 글입니다.',
  })
  @IsNotEmpty({ message: '내용은 필수입니다.' })
  content: string;
}

export class UpdatePostResponse {
  @ApiProperty({ description: '게시글 아이디', example: 'UUID' })
  id: string;

  @ApiProperty({ description: '게시글 제목', example: '첫 번째 게시글' })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '안녕하세요, 첫 글입니다.',
  })
  content: string;

  @ApiProperty({ description: '게시글 작성자 아이디', example: 'UUID' })
  authorId: string;

  @ApiProperty({
    description: '게시글 생성 일시',
    example: '2025-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '게시글 수정 일시',
    example: '2025-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class CreatePostResponse {
  @ApiProperty({ description: '게시글 생성 성공 여부', example: true })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '안녕하세요, 첫 글입니다.',
  })
  content: string;

  @ApiProperty({ description: '게시글 작성자 아이디', example: 'UUID' })
  authorId: string;
}

export class GetPostResponse {
  @ApiProperty({ description: '게시글 아이디', example: 'UUID' })
  id: string;

  @ApiProperty({ description: '게시글 제목', example: '첫 번째 게시글' })
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '안녕하세요, 첫 글입니다.',
  })
  content: string;

  @ApiProperty({ description: '게시글 작성자 아이디', example: 'UUID' })
  authorId: string;

  @ApiProperty({
    description: '게시글 생성 일시',
    example: '2025-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '게시글 수정 일시',
    example: '2025-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}

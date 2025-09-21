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

export class CreatePostResponse {
  @ApiProperty({ description: '게시글 생성 성공 여부', example: true })
  title: string;

  @ApiProperty({ description: '게시글 내용', example: '안녕하세요, 첫 글입니다.' })
  content: string;

  @ApiProperty({ description: '게시글 작성자', example: 'John Doe' })
  authorId: string;
}

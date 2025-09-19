import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, Matches } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ description: '이메일', example: 'test@example.com' })
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email: string;

  @ApiProperty({ description: '비밀번호', example: 'Password123' })
  @Length(8, 15, { message: '비밀번호는 8자 이상 15자 이하여야 합니다.' })
  @Matches(/^[A-Za-z0-9]+$/, {
    message: '비밀번호는 영문 대소문자와 숫자만 사용할 수 있습니다.',
  })
  password: string;
}

export class LoginResponse {
  @ApiProperty({ description: '액세스 토큰', example: 'eyJhbGciOi...' })
  accessToken: string;

  @ApiProperty({ description: '리프레시 토큰', example: 'eyJhbGciOi...' })
  refreshToken: string;
}

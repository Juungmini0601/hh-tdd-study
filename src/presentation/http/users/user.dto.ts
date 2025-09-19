import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsEmail, Length } from 'class-validator';

export class RegisterUserRequest {
  @ApiProperty({
    description: '이메일',
    example: 'test@example.com',
  })
  @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
  email: string;

  @ApiProperty({
    description: '비밀번호 (8~15자, 영문 대소문자 및 숫자)',
    example: 'Password123',
  })
  @Length(8, 15, { message: '비밀번호는 8자 이상 15자 이하여야 합니다.' })
  @Matches(/^[A-Za-z0-9]+$/, {
    message: '비밀번호는 영문 대소문자와 숫자만 사용할 수 있습니다.',
  })
  password: string;
}

export class RegisterUserResponse {
  @ApiProperty({
    description: '회원가입 성공 여부',
    example: true,
  })
  success: boolean;
}

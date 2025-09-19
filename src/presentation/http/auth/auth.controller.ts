import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse as ApiResponseDto } from '../common/response.dto';
import { LoginRequest, LoginResponse } from './auth.dto';
import { ApiLogin } from './auth.docs';
import { LoginUsecase } from 'src/application/auth/login.usecase';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUsecase: LoginUsecase) {}

  @Post('/login')
  @ApiLogin()
  async login(@Body() request: LoginRequest) {
    const token = await this.loginUsecase.execute(request);
    const response: LoginResponse = {
      accessToken: token.getAccessToken(),
      refreshToken: token.getRefreshToken(),
    };

    return ApiResponseDto.success<LoginResponse>(response);
  }
}

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { CreateUserUsecase } from '../../../application/user/create-user.usecase';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse as ApiResponseDto } from '../common/response.dto';
import { RegisterUserRequest, RegisterUserResponse } from './user.dto';
import { ApiRegisterUser } from './user.docs';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('User API')
@Controller('users')
export class UserController {
  constructor(private readonly createUserUsecase: CreateUserUsecase) {}

  @Post('/register')
  @ApiRegisterUser()
  async registerUser(@Body() registerUserRequest: RegisterUserRequest) {
    await this.createUserUsecase.execute(registerUserRequest);
    return ApiResponseDto.success<RegisterUserResponse>();
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  getUser(@Req() req: Request) {
    return ApiResponseDto.success({ me: req.user });
  }

  @Get('/hello')
  hello() {
    return 'hello';
  }
}

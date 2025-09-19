import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUsecase } from '../../../application/user/create-user.usecase';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponse as ApiResponseDto } from '../common/response.dto';
import { RegisterUserRequest, RegisterUserResponse } from './user.dto';
import { ApiRegisterUser } from './user.docs';

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
}

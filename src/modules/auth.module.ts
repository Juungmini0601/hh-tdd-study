import { Module } from '@nestjs/common';
import { BcryptEncoder } from '../application/auth/bcrypt-encoder';
import { PASSWORD_ENCODER } from 'src/application/auth/password-encoder';

@Module({
  imports: [],
  controllers: [],
  providers: [{ provide: PASSWORD_ENCODER, useClass: BcryptEncoder }],
  exports: [PASSWORD_ENCODER],
})
export class AuthModule {}

import { PasswordEncoder } from './password-encoder';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptEncoder implements PasswordEncoder {
  async encode(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async matches(password: string, encodedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, encodedPassword);
  }
}

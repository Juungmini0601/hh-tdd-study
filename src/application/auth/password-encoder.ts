export interface PasswordEncoder {
  encode(password: string): Promise<string>;
  matches(password: string, encodedPassword: string): Promise<boolean>;
}

export const PASSWORD_ENCODER = Symbol('PASSWORD_ENCODER');

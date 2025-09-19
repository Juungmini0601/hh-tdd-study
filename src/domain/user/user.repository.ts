import { User } from './user.domain';

export interface UserRepository {
  save(user: User): Promise<User>;

  existsByEmail(email: string): Promise<boolean>;

  findByEmail(email: string): Promise<User | null>;

  findByEmailOrElseThrow(email: string): Promise<User>;
}

export const USER_REPOSITORY = 'UserRepository';

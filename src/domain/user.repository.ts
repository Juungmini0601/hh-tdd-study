import { User } from './user.domain';

export interface UserRepository {
  save(user: User): Promise<User>;

  existsByEmail(email: string): Promise<boolean>;
}

export const USER_REPOSITORY = 'UserRepository';

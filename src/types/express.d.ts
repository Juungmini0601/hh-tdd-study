import { TokenPayload } from 'src/domain/auth/auth.domain';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

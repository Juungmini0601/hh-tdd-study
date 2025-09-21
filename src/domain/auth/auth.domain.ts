export class Token {
  private accessToken: string;
  private refreshToken: string;

  constructor(props: { accessToken: string; refreshToken: string }) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }
}

export class TokenPayload {
  private sub: string;
  private email: string;
  private tokenType: string;
  private iat: number;
  private exp: number;

  constructor(props: {
    sub: string;
    email: string;
    tokenType: string;
    iat: number;
    exp: number;
  }) {
    this.sub = props.sub;
    this.email = props.email;
    this.tokenType = props.tokenType;
    this.iat = props.iat;
    this.exp = props.exp;
  }

  getSub(): string {
    return this.sub;
  }

  getEmail(): string {
    return this.email;
  }

  getTokenType(): string {
    return this.tokenType;
  }

  getIat(): number {
    return this.iat;
  }

  getExp(): number {
    return this.exp;
  }

  isAccessToken(): boolean {
    return this.tokenType === TOKEN_TYPE.ACCESS;
  }

  isRefreshToken(): boolean {
    return this.tokenType === TOKEN_TYPE.REFRESH;
  }
}

export const TOKEN_TYPE = {
  ACCESS: 'access',
  REFRESH: 'refresh',
} as const;

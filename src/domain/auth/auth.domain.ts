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

export const TOKEN_TYPE = {
  ACCESS: 'access',
  REFRESH: 'refresh',
} as const;

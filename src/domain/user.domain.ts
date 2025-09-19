export type UserId = string;

export class User {
  private id?: UserId;
  private email: string;
  private password: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(props: {
    id?: UserId;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  // Getters (불변식 유지 위해 변경자 제한)
  getId(): UserId | undefined {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}

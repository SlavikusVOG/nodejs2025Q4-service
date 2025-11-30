import { Exclude } from 'class-transformer';

export class User {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    this.id = crypto.randomUUID();
    this.createdAt = this.createdAt ?? Date.now();
    this.updatedAt = this.updatedAt ?? Date.now();
  }

  updatePassword(oldPassword: string, newPassword: string): boolean {
    if (this.password === oldPassword) {
      this.password = newPassword;
      this.updatedAt = Date.now();
      return true;
    }
    return false;
  }
}

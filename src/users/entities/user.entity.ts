import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string; // uuid v4

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  version: number; // integer number, increments on update

  @Column()
  createdAt: number; // timestamp of creation

  @Column()
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<User>) {
    const time = Date.now();
    Object.assign(this, partial);
    this.id = crypto.randomUUID();
    this.createdAt = this.createdAt ?? time;
    this.updatedAt = this.updatedAt ?? time;
    this.version = 1;
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

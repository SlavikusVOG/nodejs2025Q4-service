import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { Database } from 'src/database/db/db.interface';
import { InMemoryDbService } from 'src/database/in-memory-db/in-memory-db.service';

@Injectable()
export class UsersService {
  db: Database = new InMemoryDbService();
  create(createUserDto: CreateUserDto) {
    const result = this.db.createUser(createUserDto);
    return result;
  }

  findAll() {
    const result = this.db.findAllUsers();
    return result;
  }

  findOne(id: string) {
    const result = this.db.findUser(id);
    return result;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const result = this.db.updateUser(id, updateUserDto);
    return result;
  }

  updatePassword(id: string, updateUserDto: UpdateUserPasswordDto) {
    const result = this.db.updateUserPassword(
      id,
      updateUserDto.oldPassword,
      updateUserDto.newPassword,
    );
    return result;
  }

  remove(id: string) {
    return this.db.deleteUser(id);
  }
}

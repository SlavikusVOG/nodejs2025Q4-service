import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { TypeOrmDatabaseService } from 'src/database/typeorm/typeorm-database.service';

@Injectable()
export class UsersService {
  constructor(@Inject('DB') private db: TypeOrmDatabaseService) {}
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

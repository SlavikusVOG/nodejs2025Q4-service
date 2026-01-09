import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { TypeOrmDatabaseService } from '../database/typeorm/typeorm-database.service';

@Injectable()
export class UsersService {
  constructor(@Inject('TypeORM') private db: TypeOrmDatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    const result = await this.db.createUser(createUserDto);
    return result;
  }

  async findAll() {
    const result = await this.db.findAllUsers();
    return result;
  }

  async findOne(id: string) {
    const result = await this.db.findUser(id);
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.db.updateUser(id, updateUserDto);
    return result;
  }

  async updatePassword(id: string, updateUserDto: UpdateUserPasswordDto) {
    const result = await this.db.updateUserPassword(
      id,
      updateUserDto.oldPassword,
      updateUserDto.newPassword,
    );
    return result;
  }

  async remove(id: string) {
    return await this.db.deleteUser(id);
  }
}

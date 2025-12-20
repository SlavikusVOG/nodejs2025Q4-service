import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      if (user) {
        return user;
      }
      throw new Error();
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const user = await this.usersService.findOne(id);
      if (user) {
        return user;
      }
      throw new Error(`${HttpStatus.NOT_FOUND}`);
    } catch (error) {
      if (error.message === `${HttpStatus.NOT_FOUND}`) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserPasswordDto,
  ) {
    try {
      const result = await this.usersService.updatePassword(id, updateUserDto);
      if (result) {
        return 'Password changed';
      }
    } catch (error) {
      if (error.message === `${HttpStatus.NOT_FOUND}`) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      if (error.message === `${HttpStatus.FORBIDDEN}`) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.usersService.remove(id);
      if (result) {
        return true;
      }
      throw new Error(`${HttpStatus.NOT_FOUND}`);
    } catch (error) {
      if (error.message === `${HttpStatus.NOT_FOUND}`) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}

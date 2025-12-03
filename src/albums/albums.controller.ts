import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      const album = this.albumsService.create(createAlbumDto);
      if (album) {
        return album;
      }
      throw new Error();
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const album = this.albumsService.findOne(id);
      if (album) {
        return album;
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
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      const result = this.albumsService.update(id, updateAlbumDto);
      if (result) {
        return result;
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
  remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = this.albumsService.remove(id);
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

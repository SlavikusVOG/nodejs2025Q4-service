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
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

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

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
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

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
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

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto) {
    try {
      const artist = this.artistsService.create(createArtistDto);
      if (artist) {
        return artist;
      }
      throw new Error();
    } catch {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const artist = this.artistsService.findOne(id);
      if (artist) {
        return artist;
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
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      const result = this.artistsService.update(id, updateArtistDto);
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
      const result = this.artistsService.remove(id);
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

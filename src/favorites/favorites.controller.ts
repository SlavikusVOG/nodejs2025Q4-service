import {
  Controller,
  Post,
  Delete,
  Param,
  Get,
  HttpCode,
  HttpStatus,
  HttpException,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponseDto } from './dto/favorites-response.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(): FavoritesResponseDto {
    return this.favoritesService.getAllFavorites();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.addTrack(id);
    } catch (error) {
      if (error.message === `${HttpStatus.UNPROCESSABLE_ENTITY}`) {
        throw new HttpException(
          'Unprocessable Entity',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.removeTrack(id);
    } catch (error) {
      if (error.message === `${HttpStatus.NOT_FOUND}`) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.addAlbum(id);
    } catch (error) {
      if (error.message === `${HttpStatus.UNPROCESSABLE_ENTITY}`) {
        throw new HttpException(
          'Unprocessable Entity',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.removeAlbum(id);
    } catch (error) {
      if (error.message === `${HttpStatus.NOT_FOUND}`) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.addArtist(id);
    } catch (error) {
      if (error.message === `${HttpStatus.UNPROCESSABLE_ENTITY}`) {
        throw new HttpException(
          'Unprocessable Entity',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoritesService.removeArtist(id);
    } catch (error) {
      if (error.message === `${HttpStatus.NOT_FOUND}`) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}

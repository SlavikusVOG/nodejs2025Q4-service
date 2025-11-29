import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './entities/user/user.service';
import { ArtistService } from './entities/artist/artist.service';
import { TrackService } from './entities/track/track.service';
import { AlbumService } from './entities/album/album.service';
import { FavoritesService } from './entities/favorites/favorites.service';
import { UserController } from './entities/user/user.controller';
import { ArtistController } from './entities/artist/artist.controller';
import { TrackController } from './entities/track/track.controller';
import { AlbumController } from './entities/album/album.controller';
import { FavoritesController } from './entities/favorites/favorites.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, ArtistController, TrackController, AlbumController, FavoritesController],
  providers: [AppService, UserService, ArtistService, TrackService, AlbumService, FavoritesService],
})
export class AppModule {}

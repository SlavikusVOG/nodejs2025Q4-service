import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './entities/user/user.service';
import { ArtistService } from './entities/artist/artist.service';
import { TrackService } from './entities/track/track.service';
import { AlbumService } from './entities/album/album.service';
import { FavoritesService } from './entities/favorites/favorites.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService, ArtistService, TrackService, AlbumService, FavoritesService],
})
export class AppModule {}

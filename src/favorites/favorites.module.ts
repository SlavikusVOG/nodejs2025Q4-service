import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmDatabaseService } from 'src/database/typeorm/typeorm-database.service';
import { User } from '../users/entities/user.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { FavoriteAlbums } from './entities/favorite-albums.entity';
import { FavoriteArtists } from './entities/favorite-artists.entity';
import { FavoriteTracks } from './entities/favorite-tracks.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Artist,
      Album,
      Track,
      FavoriteAlbums,
      FavoriteArtists,
      FavoriteTracks,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: 'TypeORM',
      useClass: TypeOrmDatabaseService,
    },
  ],
})
export class FavoritesModule {}

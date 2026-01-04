import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmDatabaseService } from 'src/database/typeorm/typeorm-database.service';
import { User } from '../users/entities/user.entity';
import { Artist } from './entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';
import { FavoriteAlbums } from '../favorites/entities/favorite-albums.entity';
import { FavoriteArtists } from '../favorites/entities/favorite-artists.entity';
import { FavoriteTracks } from '../favorites/entities/favorite-tracks.entity';

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
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: 'TypeORM',
      useClass: TypeOrmDatabaseService,
    },
  ],
})
export class ArtistsModule {}

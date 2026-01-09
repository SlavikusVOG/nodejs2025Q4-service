import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmDatabaseService } from 'src/database/typeorm/typeorm-database.service';
import { User } from '../users/entities/user.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from './entities/album.entity';
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
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'TypeORM',
      useClass: TypeOrmDatabaseService,
    },
  ],
})
export class AlbumsModule {}

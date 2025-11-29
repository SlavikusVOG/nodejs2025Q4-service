import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
  ],
  controllers: [
    AppController,
    AbortController,
    AppController,
    AppController,
    AbortController,
  ],
  providers: [AppService],
})
export class AppModule {}

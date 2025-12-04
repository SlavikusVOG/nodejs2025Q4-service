import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { InMemoryDbService } from './database/in-memory-db/in-memory-db.service';
import { ConfigModule } from '@nestjs/config';

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
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, AppController, AppController],
  providers: [
    AppService,
    InMemoryDbService,
    {
      provide: 'DB',
      useClass: InMemoryDbService,
    },
  ],
})
export class AppModule {}

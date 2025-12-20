import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './ormconfig';
import { TypeOrmDatabaseService } from './database/typeorm/typeorm-database.service';

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
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
  ],
  controllers: [AppController, AppController, AppController],
  providers: [
    AppService,
    {
      provide: 'TypeORM',
      useClass: TypeOrmDatabaseService,
    },
  ],
})
export class AppModule {}

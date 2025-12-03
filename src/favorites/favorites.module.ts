import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryDbService } from 'src/database/in-memory-db/in-memory-db.service';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: 'DB',
      useClass: InMemoryDbService,
    },
  ],
})
export class FavoritesModule {}

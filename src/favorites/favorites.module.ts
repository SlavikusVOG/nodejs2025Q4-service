import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmDatabaseService } from 'src/database/typeorm/typeorm-database.service';

@Module({
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

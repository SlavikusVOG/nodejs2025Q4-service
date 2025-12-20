import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmDatabaseService } from 'src/database/typeorm/typeorm-database.service';

@Module({
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

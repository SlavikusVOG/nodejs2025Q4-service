import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmDatabaseService } from 'src/database/typeorm/typeorm-database.service';

@Module({
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

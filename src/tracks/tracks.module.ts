import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmDatabaseService } from 'src/database/typeorm/typeorm-database.service';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'TypeORM',
      useClass: TypeOrmDatabaseService,
    },
  ],
})
export class TracksModule {}

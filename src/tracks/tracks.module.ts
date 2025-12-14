import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryDbService } from '../database/in-memory-db/in-memory-db.service';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'DB',
      useClass: InMemoryDbService,
    },
  ],
})
export class TracksModule {}

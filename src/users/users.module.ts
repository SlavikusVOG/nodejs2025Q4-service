import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryDbService } from '../database/in-memory-db/in-memory-db.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'DB',
      useClass: InMemoryDbService,
    },
  ],
})
export class UsersModule {}

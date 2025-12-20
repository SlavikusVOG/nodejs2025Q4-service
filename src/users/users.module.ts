import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmDatabaseService } from 'src/database/typeorm/typeorm-database.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'TypeORM',
      useClass: TypeOrmDatabaseService,
    },
  ],
})
export class UsersModule {}

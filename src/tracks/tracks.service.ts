import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TypeOrmDatabaseService } from '../database/typeorm/typeorm-database.service';

@Injectable()
export class TracksService {
  constructor(@Inject('TypeORM') private db: TypeOrmDatabaseService) {}
  async create(createTrackDto: CreateTrackDto) {
    const result = await this.db.createTrack(createTrackDto);
    return result;
  }

  async findAll() {
    const result = await this.db.findAllTracks();
    return result;
  }

  async findOne(id: string) {
    const result = await this.db.findTrack(id);
    return result;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const result = await this.db.updateTrack(id, updateTrackDto);
    return result;
  }

  async remove(id: string) {
    const result = await this.db.deleteTrack(id);
    return result;
  }
}

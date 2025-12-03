import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryDbService } from 'src/database/in-memory-db/in-memory-db.service';

@Injectable()
export class TracksService {
  constructor(@Inject('DB') private db: InMemoryDbService) {}
  create(createTrackDto: CreateTrackDto) {
    const result = this.db.createTrack(createTrackDto);
    return result;
  }

  findAll() {
    const result = this.db.findAllTracks();
    return result;
  }

  findOne(id: string) {
    const result = this.db.findTrack(id);
    return result;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const result = this.db.updateTrack(id, updateTrackDto);
    return result;
  }

  remove(id: string) {
    const result = this.db.deleteTrack(id);
    return result;
  }
}

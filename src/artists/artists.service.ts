import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryDbService } from 'src/database/in-memory-db/in-memory-db.service';

@Injectable()
export class ArtistsService {
  constructor(@Inject('DB') private db: InMemoryDbService) {}
  create(createArtistDto: CreateArtistDto) {
    const result = this.db.createArtist(createArtistDto);
    return result;
  }

  findAll() {
    const result = this.db.findAllArtists();
    return result;
  }

  findOne(id: string) {
    const result = this.db.findArtist(id);
    return result;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const result = this.db.updateArtist(id, updateArtistDto);
    return result;
  }

  remove(id: string) {
    const result = this.db.deleteArtist(id);
    return result;
  }
}

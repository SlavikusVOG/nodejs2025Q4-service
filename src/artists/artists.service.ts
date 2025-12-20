import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TypeOrmDatabaseService } from '../database/typeorm/typeorm-database.service';

@Injectable()
export class ArtistsService {
  constructor(@Inject('TypeORM') private db: TypeOrmDatabaseService) {}
  async create(createArtistDto: CreateArtistDto) {
    const result = await this.db.createArtist(createArtistDto);
    return result;
  }

  async findAll() {
    const result = await this.db.findAllArtists();
    return result;
  }

  async findOne(id: string) {
    const result = await this.db.findArtist(id);
    return result;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const result = await this.db.updateArtist(id, updateArtistDto);
    return result;
  }

  async remove(id: string) {
    const result = await this.db.deleteArtist(id);
    return result;
  }
}

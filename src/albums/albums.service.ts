import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TypeOrmDatabaseService } from '../database/typeorm/typeorm-database.service';

@Injectable()
export class AlbumsService {
  constructor(@Inject('TypeORM') private db: TypeOrmDatabaseService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const result = await this.db.createAlbum(createAlbumDto);
    return result;
  }

  async findAll() {
    const result = await this.db.findAllAlbums();
    return result;
  }

  async findOne(id: string) {
    const result = await this.db.findAlbum(id);
    return result;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const result = await this.db.updateAlbum(id, updateAlbumDto);
    return result;
  }

  async remove(id: string) {
    const result = await this.db.deleteAlbum(id);
    return result;
  }
}

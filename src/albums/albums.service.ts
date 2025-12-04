import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Database } from 'src/database/db/db.interface';

@Injectable()
export class AlbumsService {
  constructor(@Inject('DB') private db: Database) {}
  create(createAlbumDto: CreateAlbumDto) {
    const result = this.db.createAlbum(createAlbumDto);
    return result;
  }

  findAll() {
    const result = this.db.findAllAlbums();
    return result;
  }

  findOne(id: string) {
    const result = this.db.findAlbum(id);
    return result;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const result = this.db.updateAlbum(id, updateAlbumDto);
    return result;
  }

  remove(id: string) {
    const result = this.db.deleteAlbum(id);
    return result;
  }
}

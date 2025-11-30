import { Injectable } from '@nestjs/common';
import { Database } from 'src/database/db/db.interface';
import { InMemoryDbService } from 'src/database/in-memory-db/in-memory-db.service';

@Injectable()
export class FavoritesService {
  db: Database = new InMemoryDbService();
  addAlbum(id: string) {
    const album = this.db.findAlbum(id);
    if (album) {
      this.db.addFavoriteAlbum(id);
    }
  }

  addArtist(id: string) {
    const artist = this.db.findArtist(id);
    if (artist) {
      this.db.addFavoriteArtists(id);
    }
  }

  addTrack(id: string) {
    const track = this.db.findTrack(id);
    if (track) {
      this.db.addFavoriteTrack(id);
    }
  }

  removeAlbum(id: string) {
    this.db.deleteFavoriteAlbum(id);
  }

  removeArtist(id: string) {
    this.db.deleteFavoriteArtist(id);
  }

  removeTrack(id: string) {
    this.db.deleteFavoriteTrack(id);
  }
}

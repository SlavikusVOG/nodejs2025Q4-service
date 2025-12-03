import { Inject, Injectable } from '@nestjs/common';
import { Database } from 'src/database/db/db.interface';
import { InMemoryDbService } from 'src/database/in-memory-db/in-memory-db.service';

@Injectable()
export class FavoritesService {
  constructor(@Inject('DB') private db: InMemoryDbService) {}
  getAllFavorites() {
    const artistIds = this.db.findFavoriteArtists();
    const albumIds = this.db.findFavoriteAlbums();
    const trackIds = this.db.findFavoriteTracks();
    const artists = artistIds.map((id) => this.db.findArtist(id));
    const albums = albumIds.map((id) => this.db.findAlbum(id));
    const tracks = trackIds.map((id) => this.db.findTrack(id));
    return {
      artists,
      albums,
      tracks,
    };
  }

  addAlbum(id: string) {
    const album = this.db.findAlbum(id);
    if (album) {
      this.db.addFavoriteAlbum(id);
    }
    return album;
  }

  addArtist(id: string) {
    const artist = this.db.findArtist(id);
    if (artist) {
      this.db.addFavoriteArtists(id);
    }
    return artist;
  }

  addTrack(id: string) {
    const track = this.db.findTrack(id);
    if (track) {
      this.db.addFavoriteTrack(id);
    }
    return track;
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

import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmDatabaseService } from '../database/typeorm/typeorm-database.service';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(@Inject('TypeORM') private db: TypeOrmDatabaseService) {}
  async getAllFavorites() {
    const artistIds = await this.db.findFavoriteArtists();
    const albumIds = await this.db.findFavoriteAlbums();
    const trackIds = await this.db.findFavoriteTracks();
    const artists = await Promise.all(
      artistIds.map((id) => this.db.findArtist(id).catch(() => null)),
    );
    const albums = await Promise.all(
      albumIds.map((id) => this.db.findAlbum(id).catch(() => null)),
    );
    const tracks = await Promise.all(
      trackIds.map((id) => this.db.findTrack(id).catch(() => null)),
    );
    return {
      artists: artists.filter((a) => a !== null) as Artist[],
      albums: albums.filter((a) => a !== null) as Album[],
      tracks: tracks.filter((t) => t !== null) as Track[],
    };
  }

  async addAlbum(id: string) {
    const album = await this.db.findAlbum(id);
    if (album) {
      await this.db.addFavoriteAlbum(id);
      return album;
    }
    throw new Error('422');
  }

  async addArtist(id: string) {
    const artist = await this.db.findArtist(id);
    if (artist) {
      await this.db.addFavoriteArtists(id);
      return artist;
    }
    throw new Error('422');
  }

  async addTrack(id: string) {
    const track = await this.db.findTrack(id);
    if (track) {
      await this.db.addFavoriteTrack(id);
      return track;
    }
    throw new Error('422');
  }

  async removeAlbum(id: string) {
    await this.db.deleteFavoriteAlbum(id);
  }

  async removeArtist(id: string) {
    await this.db.deleteFavoriteArtist(id);
  }

  async removeTrack(id: string) {
    await this.db.deleteFavoriteTrack(id);
  }
}

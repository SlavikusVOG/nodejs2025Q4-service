import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

export interface Database {
  createUser(data: Pick<User, 'login' | 'password'>): User;

  findUser(id: string): User;

  findAllUsers(): User[];

  updateUser(id: string, data: Partial<User>): User | null;

  updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): boolean;

  deleteUser(id: string): boolean;

  createArtist(data: Omit<Artist, 'id'>): Artist;

  findArtist(id: string): Artist;

  findAllArtists(): Artist[];

  updateArtist(id: string, data: Partial<Artist>): Artist;

  deleteArtist(id: string);

  createTrack(data: Omit<Track, 'id'>): Track;

  findTrack(id: string): Track;

  findAllTracks(): Track[];

  updateTrack(id: string, data: Partial<Track>): Track;

  deleteTrack(id: string);

  createAlbum(data: Omit<Album, 'id'>): Album;

  findAlbum(id: string): Album;

  findAllAlbums(): Album[];

  updateAlbum(id: string, data: Partial<Album>): Album;

  deleteAlbum(id: string);

  findFavoriteAlbums(): string[];

  addFavoriteAlbum(id: string);

  deleteFavoriteAlbum(id: string);

  findFavoriteArtists(): string[];

  addFavoriteArtists(id: string);

  deleteFavoriteArtist(id: string);

  findFavoriteTracks(): string[];

  addFavoriteTrack(id: string);

  deleteFavoriteTrack(id: string);
}

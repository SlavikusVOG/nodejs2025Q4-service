import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

export interface Database {
  createUser(
    data: Omit<User, 'id' | 'version' | 'createdAt' | 'updatedAt'>,
  ): User;

  findUser(id: string): User;

  findAllUsers(): User[];

  updateUser(id: string, data: Partial<User>): User | null;

  updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): boolean;

  deleteUser(id: string);

  createArtist(data: Omit<Artist, 'id'>): Artist;

  findArtist(id: string): Artist;

  findAllArtists(): Artist[];

  updateArtist(id: string, data: Partial<Artist>): Artist;

  deleteArtist(id: string);

  createTrack(data: Omit<Track, 'id'>): Track;

  getTrack(id: string): Track;

  getAllTracks(): Track[];

  updateTrack(id: string, data: Partial<Track>): Track;

  deleteTrack(id: string);

  createAlbum(data: Omit<Album, 'id'>): Album;

  getAlbum(id: string): Album;

  getAllAlbums(): Album[];

  updateAlbum(id: string, data: Partial<Album>): Album;

  deleteAlbum(id: string);

  getFavoriteAlbums(): string[];

  addFavoriteAlbums(data: Album[]);

  deleteFavoriteAlbum(ids: string);

  getFavoriteArtists(): string[];

  addFavoriteArtists(data: Artist[]);

  deleteFavoriteArtist(ids: string);

  getFavoriteTracks(): string[];

  addFavoriteTracks(data: Track[]);

  deleteFavoriteTrack(ids: string);
}

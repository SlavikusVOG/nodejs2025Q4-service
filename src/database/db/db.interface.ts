import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';
import { User } from '../../users/entities/user.entity';

export interface Database {
  createUser(data: Pick<User, 'login' | 'password'>): User | Promise<User>;

  findUser(id: string): User | Promise<User>;

  findAllUsers(): User[] | Promise<User[]>;

  updateUser(
    id: string,
    data: Partial<User>,
  ): User | Promise<User> | null | Promise<null>;

  updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): boolean | Promise<boolean>;

  deleteUser(id: string): boolean | Promise<boolean>;

  createArtist(
    data: Omit<Artist, 'id' | 'favorites' | 'tracks' | 'albums'>,
  ): Artist | Promise<Artist>;

  findArtist(id: string): Artist | Promise<Artist>;

  findAllArtists(): Artist[] | Promise<Artist[]>;

  updateArtist(id: string, data: Partial<Artist>): Artist | Promise<Artist>;

  deleteArtist(id: string): boolean | Promise<boolean>;

  createTrack(
    data: Omit<Track, 'id' | 'artist' | 'album' | 'favorites'>,
  ): Track | Promise<Track>;

  findTrack(id: string): Track | Promise<Track>;

  findAllTracks(): Track[] | Promise<Track[]>;

  updateTrack(id: string, data: Partial<Track>): Track | Promise<Track>;

  deleteTrack(id: string): boolean | Promise<boolean>;

  createAlbum(
    data: Omit<Album, 'id' | 'artist' | 'favorites' | 'tracks'>,
  ): Album | Promise<Album>;

  findAlbum(id: string): Album | Promise<Album>;

  findAllAlbums(): Album[] | Promise<Album[]>;

  updateAlbum(id: string, data: Partial<Album>): Album | Promise<Album>;

  deleteAlbum(id: string): boolean | Promise<boolean>;

  findFavoriteAlbums(): string[] | Promise<string[]>;

  addFavoriteAlbum(id: string);

  deleteFavoriteAlbum(id: string);

  findFavoriteArtists(): string[] | Promise<string[]>;

  addFavoriteArtists(id: string);

  deleteFavoriteArtist(id: string);

  findFavoriteTracks(): string[] | Promise<string[]>;

  addFavoriteTrack(id: string);

  deleteFavoriteTrack(id: string);
}

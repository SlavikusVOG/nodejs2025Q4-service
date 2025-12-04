import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';
import { Database } from '../db/db.interface';

@Injectable()
export class InMemoryDbService implements Database {
  private users = new Map<string, User>();
  private artists = new Map<string, Artist>();
  private albums = new Map<string, Album>();
  private tracks = new Map<string, Track>();
  private favorites = new Favorite();

  private static instance: InMemoryDbService;

  constructor() {
    if (!InMemoryDbService.instance) {
      InMemoryDbService.instance = this;
    }
    return InMemoryDbService.instance;
  }

  createUser(data: Pick<User, 'login' | 'password'>): User {
    const user = new User(data);
    this.users.set(user.id, user);
    return user;
  }

  findUser(id: string) {
    const result = this.users.get(id);
    return result;
  }

  findAllUsers() {
    const result = Array.from(this.users.values());
    return result;
  }

  updateUser(id: string, data: Partial<User>): User | null {
    const user = this.users.get(id);
    if (user) {
      Object.assign(user, data);
      user.version += 1;
      user.updatedAt = Date.now();
      return user;
    }
    throw new Error('404');
  }

  updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): boolean {
    const user = this.users.get(id);
    if (user) {
      if (user.password === oldPassword) {
        user.updatePassword(oldPassword, newPassword);
        user.version += 1;
        return true;
      }
      throw new Error('403');
    }
    throw new Error('404');
  }

  deleteUser(id: string): boolean {
    const result = this.users.delete(id);
    return result;
  }

  createArtist(data: Omit<Artist, 'id'>) {
    const artist = new Artist(data);
    this.artists.set(artist.id, artist);
    return artist;
  }

  findArtist(id: string) {
    const result = this.artists.get(id);
    return result;
  }

  findAllArtists() {
    const result = Array.from(this.artists.values());
    return result;
  }

  updateArtist(id: string, data: Partial<Artist>) {
    const artist = this.artists.get(id);
    if (artist) {
      Object.assign(artist, data);
      return artist;
    }
    throw new Error('404');
  }

  deleteArtist(id: string) {
    this.favorites.artists = this.favorites.artists.filter((aId) => aId !== id);

    const albums = this.findAllAlbums();
    const artistAlbums = albums.filter((a) => a.artistId === id);
    artistAlbums.forEach((a) => {
      this.updateAlbum(a.id, { artistId: null });
    });

    const tracks = this.findAllTracks();
    tracks.forEach((t) => {
      this.updateTrack(t.id, { artistId: null });
    });
    const result = this.artists.delete(id);
    return result;
  }

  createTrack(data: Omit<Track, 'id'>) {
    const track = new Track(data);
    this.tracks.set(track.id, track);
    return track;
  }

  findTrack(id: string) {
    const track = this.tracks.get(id);
    return track;
  }

  findAllTracks() {
    const result = Array.from(this.tracks.values());
    return result;
  }

  updateTrack(id: string, data: Partial<Track>) {
    const track = this.findTrack(id);
    if (track) {
      Object.assign(track, data);
      return track;
    }
    throw new Error('404');
  }

  deleteTrack(id: string) {
    const result = this.tracks.delete(id);
    this.favorites.tracks = this.favorites.tracks.filter((tId) => tId !== id);
    return result;
  }

  createAlbum(data: Omit<Album, 'id'>) {
    const album = new Album(data);
    this.albums.set(album.id, album);
    return album;
  }

  findAlbum(id: string) {
    const album = this.albums.get(id);
    return album;
  }

  findAllAlbums() {
    const result = Array.from(this.albums.values());
    return result;
  }

  updateAlbum(id: string, data: Partial<Album>) {
    const album = this.albums.get(id);
    if (album) {
      Object.assign(album, data);
      return album;
    }
    throw new Error('404');
  }

  deleteAlbum(id: string) {
    this.favorites.albums = this.favorites.albums.filter((aId) => aId !== id);
    const tracks = this.findAllTracks();
    const albumTracks = tracks.filter((t) => t.albumId === id);
    albumTracks.forEach((t) => {
      this.updateTrack(t.id, { albumId: null });
    });
    const result = this.albums.delete(id);
    return result;
  }

  findFavoriteAlbums() {
    return this.favorites.albums;
  }

  addFavoriteAlbum(id: string) {
    if (this.albums.get(id)) {
      this.favorites.albums.push(id);
      return true;
    }
    throw new Error('422');
  }

  deleteFavoriteAlbum(id: string) {
    if (this.albums.get(id)) {
      this.favorites.albums = this.favorites.albums.filter((aId) => aId !== id);
      this.favorites.artists = this.favorites.artists.filter(
        (aId) => aId !== id,
      );
      return true;
    }
    throw new Error('404');
  }

  findFavoriteArtists() {
    return this.favorites.artists;
  }

  addFavoriteArtists(id: string) {
    if (this.artists.get(id)) {
      this.favorites.artists.push(id);
      return true;
    }
    throw new Error('422');
  }

  deleteFavoriteArtist(id: string) {
    if (this.artists.get(id)) {
      this.favorites.artists = this.favorites.artists.filter(
        (aId) => aId !== id,
      );
      return true;
    }
    throw new Error('404');
  }

  findFavoriteTracks() {
    return this.favorites.tracks;
  }

  addFavoriteTrack(id: string) {
    if (this.tracks.get(id)) {
      this.favorites.tracks.push(id);
      return true;
    }
    throw new Error('422');
  }

  deleteFavoriteTrack(id: string) {
    if (this.tracks.get(id)) {
      this.favorites.tracks = this.favorites.tracks.filter((tId) => tId !== id);
      return true;
    }
    throw new Error('404');
  }
}

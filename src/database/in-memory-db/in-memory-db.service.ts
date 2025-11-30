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

  createUser(data: Omit<User, 'id' | 'version' | 'createdAt' | 'updatedAt'>) {
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
    return null;
  }

  updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): boolean {
    const user = this.users.get(id);
    if (user) {
      user.updatePassword(oldPassword, newPassword);
      return true;
    }
    return false;
  }

  deleteUser(id: string) {
    this.users.delete(id);
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
    return null;
  }

  deleteArtist(id: string) {
    this.artists.delete(id);
    this.favorites.artists = this.favorites.artists.filter((aId) => aId !== id);

    this.albums.forEach((a) => {
      if (a.artistId === id) a.artistId = null;
    });
    this.tracks.forEach((t) => {
      if (t.artistId === id) t.artistId = null;
    });
  }

  createTrack(data: Omit<Track, 'id'>) {
    const track = new Track(data);
    this.tracks.set(track.id, track);
    return track;
  }

  getTrack(id: string) {
    const track = this.tracks.get(id);
    return track;
  }

  getAllTracks() {
    const result = Array.from(this.tracks.values());
    return result;
  }

  updateTrack(id: string, data: Partial<Track>) {
    const track = this.getTrack(id);
    if (track) {
      Object.assign(track, data);
      return track;
    }
    return null;
  }

  deleteTrack(id: string) {
    this.tracks.delete(id);
    this.favorites.tracks = this.favorites.tracks.filter((tId) => tId !== id);
  }

  createAlbum(data: Omit<Album, 'id'>) {
    const album = new Album(data);
    this.albums.set(album.id, album);
    return album;
  }

  getAlbum(id: string) {
    const album = this.albums.get(id);
    return album;
  }

  getAllAlbums() {
    const result = Array.from(this.albums.values());
    return result;
  }

  updateAlbum(id: string, data: Partial<Album>) {
    const album = this.albums.get(id);
    if (album) {
      Object.assign(album, data);
      return album;
    }
    return null;
  }

  deleteAlbum(id: string) {
    this.albums.delete(id);
    this.favorites.albums = this.favorites.albums.filter((aId) => aId !== id);
    this.tracks.forEach((t) => {
      if (t.albumId === id) t.albumId = null;
    });
  }

  getFavoriteAlbums() {
    return this.favorites.albums;
  }

  addFavoriteAlbums(data: Album[]) {
    const ids = data.map((d) => d.id);
    this.favorites.albums.push(...ids);
  }

  deleteFavoriteAlbum(id: string) {
    this.favorites.albums = this.favorites.albums.filter((aId) => aId !== id);
  }

  getFavoriteArtists() {
    return this.favorites.artists;
  }

  addFavoriteArtists(data: Artist[]) {
    const ids = data.map((d) => d.id);
    this.favorites.artists.push(...ids);
  }

  deleteFavoriteArtist(id: string) {
    this.favorites.artists = this.favorites.artists.filter((aId) => aId !== id);
  }

  getFavoriteTracks() {
    return this.favorites.tracks;
  }

  addFavoriteTracks(data: Track[]) {
    const ids = data.map((d) => d.id);
    this.favorites.tracks.push(...ids);
  }

  deleteFavoriteTrack(id: string) {
    this.favorites.tracks = this.favorites.tracks.filter((tId) => tId !== id);
  }
}

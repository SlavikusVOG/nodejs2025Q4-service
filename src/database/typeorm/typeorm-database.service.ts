import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';
import { Database } from '../db/db.interface';
import { FavoriteAlbums } from 'src/favorites/entities/favorite-albums.entity';
import { FavoriteArtists } from 'src/favorites/entities/favorite-artists.entity';
import { FavoriteTracks } from 'src/favorites/entities/favorite-tracks.entity';

@Injectable()
export class TypeOrmDatabaseService implements Database, OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(FavoriteAlbums)
    private favoriteAlbumsRepository: Repository<FavoriteAlbums>,
    @InjectRepository(FavoriteArtists)
    private favoriteArtistsRepository: Repository<FavoriteArtists>,
    @InjectRepository(FavoriteTracks)
    private favoriteTracksRepository: Repository<FavoriteTracks>,
  ) {}

  /* async onModuleInit() {
    await this.userRepository.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        login VARCHAR(256) UNIQUE NOT NULL,
        password VARCHAR(256) NOT NULL,
        version INTEGER DEFAULT 2,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await this.albumRepository.query(`
      CREATE TABLE IF NOT EXISTS albums (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(256) NOT NULL,
        grammy BOOLEAN,
      )
    `);
    await this.artistRepository.query(`
      CREATE TABLE IF NOT EXISTS artists (
      )
    `);
    await this.trackRepository.query(`
      CREATE TABLE IF NOT EXISTS tracks (
      )
    `);
    await this.favoriteAlbumsRepository.query(`
      CREATE TABLE IF NOT EXISTS favorites (
      )
    `);
    await this.favoriteArtistsRepository.query(`
      CREATE TABLE IF NOT EXISTS favorites (
      )
    `);
    await this.favoriteTracksRepository.query(`
      CREATE TABLE IF NOT EXISTS favorites (
      )
    `);
  } */

  // User
  async createUser(data: Pick<User, 'login' | 'password'>): Promise<User> {
    const user = this.userRepository.create({
      ...data,
      version: 1,
    });
    return this.userRepository.save(user);
  }

  async findUser(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    const user = await this.findUser(id);
    if (!user) return null;

    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this.findUser(id);
    if (user) {
      if (user.password === oldPassword) {
        user.updatePassword(oldPassword, newPassword);
        user.version += 1;
        const result = await this.userRepository.save(user);
        return !!result;
      }
      throw new NotAcceptableException();
    }
    throw new NotFoundException();
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected !== 0;
  }

  // Artist
  async createArtist(data: { name: string; grammy: boolean }): Promise<Artist> {
    const artist = this.artistRepository.create(data);
    return this.artistRepository.save(artist);
  }

  async findArtist(id: string): Promise<Artist | null> {
    return this.artistRepository.findOne({ where: { id } });
  }

  async findAllArtists(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async updateArtist(
    id: string,
    data: Partial<Artist>,
  ): Promise<Artist | null> {
    const artist = await this.findArtist(id);
    if (!artist) return null;
    Object.assign(artist, data);
    return this.artistRepository.save(artist);
  }

  async deleteArtist(id: string): Promise<boolean> {
    await this.albumRepository.update({ artistId: id }, { artistId: null });
    const result = await this.artistRepository.delete(id);
    return result.affected !== 0;
  }

  // Album
  async createAlbum(data: Omit<Album, 'id'>): Promise<Album> {
    const album = this.albumRepository.create(data);
    return this.albumRepository.save(album);
  }

  async findAlbum(id: string): Promise<Album> {
    
  }
  async findAllAlbums(): Promise<Album[]> {

  }
  async updateAlbum(id: string, data: Partial<Album>): Promise<Album> {
    
  }
  async deleteAlbum(id: string): Promise<boolean> {
    
  }
  // Track
  async createTrack(data: Omit<Track, 'id'>): Promise<Track> {
    const track = this.trackRepository.create(data);
    return this.trackRepository.save(track);
  }
  async findTrack(id: string): Track | Promise<Track> {
    
  }
  async findAllTracks(): Track[] | Promise<Track[]> {
    
  }
  async updateTrack(id: string, data: Partial<Track>): Track | Promise<Track> {
    
  }
  async deleteTrack(id: string): boolean | Promise<boolean> {
    
  }
  // Favorites
  addFavoriteAlbum(id: string) {
    
  }
  addFavoriteArtists(id: string) {
    
  }
  addFavoriteTrack(id: string) {
    
  }
  findFavoriteAlbums(): Promise<string[]> {
    
  }
  findFavoriteArtists(): Promise<string[]> {
    
  }
  findFavoriteTracks(): Promise<string[]> {
    
  }
  deleteFavoriteAlbum(id: string) {
    
  }
  deleteFavoriteArtist(id: string) {
    
  }
  deleteFavoriteTrack(id: string) {
    
  }
}

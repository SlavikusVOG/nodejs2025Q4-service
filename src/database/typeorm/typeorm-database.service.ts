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
import { FavoriteAlbums } from '../../favorites/entities/favorite-albums.entity';
import { FavoriteArtists } from '../../favorites/entities/favorite-artists.entity';
import { FavoriteTracks } from '../../favorites/entities/favorite-tracks.entity';

@Injectable()
export class TypeOrmDatabaseService implements Database, OnModuleInit {
  private static instance: TypeOrmDatabaseService;

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
  ) {
    if (!TypeOrmDatabaseService.instance) {
      TypeOrmDatabaseService.instance = this;
    }
    return TypeOrmDatabaseService.instance;
  }

  async onModuleInit(): Promise<void> {}

  // User
  async createUser(data: Pick<User, 'login' | 'password'>): Promise<User> {
    const user = await this.userRepository.create({
      ...data,
      version: 1,
    });
    const result = await this.userRepository.save(user);
    debugger;
    return result;
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
    return await this.userRepository.save(user);
  }

  async updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this.findUser(id);
    if (user) {
      if (user.password === oldPassword) {
        user.password = newPassword;
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
  async createArtist(
    data: Omit<Artist, 'id' | 'favorites' | 'tracks' | 'albums'>,
  ): Promise<Artist> {
    const artist = this.artistRepository.create(data);
    return await this.artistRepository.save(artist);
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
    return await this.artistRepository.save(artist);
  }

  async deleteArtist(id: string): Promise<boolean> {
    await this.albumRepository.update({ artistId: id }, { artistId: null });
    const result = await this.artistRepository.delete(id);
    return result.affected !== 0;
  }

  // Album
  async createAlbum(
    data: Omit<Album, 'id' | 'artist' | 'favorites' | 'tracks'>,
  ): Promise<Album> {
    const album = this.albumRepository.create(data);
    return await this.albumRepository.save(album);
  }

  async findAlbum(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async findAllAlbums(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async updateAlbum(id: string, data: Partial<Album>): Promise<Album> {
    const album = await this.findAlbum(id);
    Object.assign(album, data);
    return await this.albumRepository.save(album);
  }

  async deleteAlbum(id: string): Promise<boolean> {
    await this.trackRepository.update({ albumId: id }, { albumId: null });
    const result = await this.albumRepository.delete(id);
    return result.affected !== 0;
  }
  // Track
  async createTrack(
    data: Omit<Track, 'id' | 'artist' | 'album' | 'favorites'>,
  ): Promise<Track> {
    const track = this.trackRepository.create(data);
    return await this.trackRepository.save(track);
  }

  async findTrack(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  async findAllTracks(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async updateTrack(id: string, data: Partial<Track>): Promise<Track> {
    const track = await this.findTrack(id);
    Object.assign(track, data);
    return await this.trackRepository.save(track);
  }

  async deleteTrack(id: string): Promise<boolean> {
    const result = await this.trackRepository.delete(id);
    return result.affected !== 0;
  }
  // Favorites
  async addFavoriteAlbum(id: string): Promise<void> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotAcceptableException();
    }
    const existing = await this.favoriteAlbumsRepository.findOne({
      where: { albumId: id },
    });
    if (!existing) {
      const favorite = this.favoriteAlbumsRepository.create({ albumId: id });
      await this.favoriteAlbumsRepository.save(favorite);
    }
  }

  async addFavoriteArtists(id: string): Promise<void> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotAcceptableException();
    }
    const existing = await this.favoriteArtistsRepository.findOne({
      where: { artistId: id },
    });
    if (!existing) {
      const favorite = this.favoriteArtistsRepository.create({ artistId: id });
      await this.favoriteArtistsRepository.save(favorite);
    }
  }

  async addFavoriteTrack(id: string): Promise<void> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotAcceptableException();
    }
    const existing = await this.favoriteTracksRepository.findOne({
      where: { trackId: id },
    });
    if (!existing) {
      const favorite = this.favoriteTracksRepository.create({ trackId: id });
      await this.favoriteTracksRepository.save(favorite);
    }
  }

  async findFavoriteAlbums(): Promise<string[]> {
    const favorites = await this.favoriteAlbumsRepository.find();
    return favorites.map((f) => f.albumId);
  }

  async findFavoriteArtists(): Promise<string[]> {
    const favorites = await this.favoriteArtistsRepository.find();
    return favorites.map((f) => f.artistId);
  }

  async findFavoriteTracks(): Promise<string[]> {
    const favorites = await this.favoriteTracksRepository.find();
    return favorites.map((f) => f.trackId);
  }

  async deleteFavoriteAlbum(id: string): Promise<void> {
    await this.favoriteAlbumsRepository.delete({ albumId: id });
  }

  async deleteFavoriteArtist(id: string): Promise<void> {
    await this.favoriteArtistsRepository.delete({ artistId: id });
  }

  async deleteFavoriteTrack(id: string): Promise<void> {
    await this.favoriteTracksRepository.delete({ trackId: id });
  }
}

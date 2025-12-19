import { Track } from '../../tracks/entities/track.entity';
import { Artist } from '../../artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FavoriteAlbums } from '../../favorites/entities/favorite-albums.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  year: number;
  @OneToOne(() => Artist)
  @JoinColumn({ name: 'artistId' })
  artist: Artist;
  @Column()
  artistId: string;
  @OneToMany(() => Track, (t) => t.album)
  @JoinColumn({ name: 'albumId' })
  tracks: Track[];
  @OneToOne(() => FavoriteAlbums, (f) => f.album)
  favorites: FavoriteAlbums;
}

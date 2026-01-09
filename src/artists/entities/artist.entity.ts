import { Album } from '../../albums/entities/album.entity';
import { FavoriteArtists } from '../../favorites/entities/favorite-artists.entity';
import { Track } from '../../tracks/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  grammy: boolean;
  @OneToMany(() => Track, (track) => track.artist)
  @JoinColumn({ name: 'artistId' })
  tracks: Track[];
  @OneToMany(() => Album, (album) => album.artist)
  @JoinColumn({ name: 'artistId' })
  albums: Album[];
  @OneToOne(() => FavoriteArtists, (f) => f.artist)
  favorites: FavoriteArtists;
}

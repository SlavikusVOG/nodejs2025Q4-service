import { FavoriteTracks } from '../../favorites/entities/favorite-tracks.entity';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @ManyToOne(() => Artist, (artist) => artist.tracks)
  @JoinColumn({ name: 'artistId' })
  artist: Artist;
  @ManyToOne(() => Album)
  @JoinColumn({ name: 'albumId' })
  album: Album;
  @Column()
  duration: number; // integer number
  @Column()
  artistId: string;
  @Column()
  albumId: string;
  @OneToOne(() => FavoriteTracks, (f) => f.track)
  favorites: FavoriteTracks;
}

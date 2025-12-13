import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @ManyToOne(() => Artist, (artist) => artist.tracks)
  @JoinColumn()
  artist: Artist;
  @ManyToOne(() => Album)
  @JoinColumn()
  album: Album;
  @Column()
  duration: number; // integer number
  @Column()
  artistId: string;
  @Column()
  albumId: string;
}

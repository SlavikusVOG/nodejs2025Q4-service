import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
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
  @ManyToOne(() => Artist)
  @JoinColumn()
  artist: Artist;
  @ManyToOne(() => Album)
  @JoinColumn()
  album: Album;
  @Column()
  duration: number; // integer number
}

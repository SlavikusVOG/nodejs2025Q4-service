import { Artist } from '../../artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FavoriteArtists {
  @PrimaryGeneratedColumn()
  id: string;
  @OneToOne(() => Artist)
  @JoinColumn({ name: 'artistId' })
  artist: Artist;
  @Column()
  artistId: string;
}

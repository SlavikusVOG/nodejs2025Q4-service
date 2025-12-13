import { Artist } from '../../artists/entities/artist.entity';
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Album {
  @PrimaryGeneratedColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  year: number;
  @OneToOne(() => Artist)
  @JoinColumn()
  artist: Artist;
  @Column()
  artistId: string;
}

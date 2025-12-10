import { Artist } from 'src/artists/entities/artist.entity';
import { Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteArtists {
  @PrimaryGeneratedColumn()
  id: string;
  @OneToOne(() => Artist)
  @JoinTable()
  artist: Artist;
}

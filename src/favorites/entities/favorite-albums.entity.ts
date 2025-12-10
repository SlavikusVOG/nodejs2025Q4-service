import { Album } from 'src/albums/entities/album.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteAlbums {
  @PrimaryGeneratedColumn()
  id: string;
  @OneToOne(() => Album)
  @JoinColumn()
  album: Album;
}

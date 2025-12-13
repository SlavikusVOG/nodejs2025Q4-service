import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  grammy: boolean;
  @OneToMany(() => Track, (track) => track.artistId)
  tracks: Track[];
  @OneToMany(() => Album, (album) => album.artistId)
  albums: Album[];
}

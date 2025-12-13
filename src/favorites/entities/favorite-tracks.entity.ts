import { Track } from '../../tracks/entities/track.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteTracks {
  @PrimaryGeneratedColumn()
  id: string;
  @OneToOne(() => Track)
  @JoinColumn()
  track: Track;
}

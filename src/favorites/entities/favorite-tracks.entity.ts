import { Track } from '../../tracks/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FavoriteTracks {
  @PrimaryGeneratedColumn()
  id: string;
  @OneToOne(() => Track)
  @JoinColumn({ name: 'trackId' })
  track: Track;
  @Column()
  trackId: string;
}

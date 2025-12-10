// ormconfig.ts or data-source.ts
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'homelibrarydb',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Artist, Album, Track],
  migrations: ['src/migrations/*.ts'],
  migrationsRun: true,
});

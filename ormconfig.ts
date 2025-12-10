import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Artist } from './src/artists/entities/artist.entity';
import { Album } from './src/albums/entities/album.entity';
import { Track } from './src/tracks/entities/track.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'homelibrarydb',

  // Educational: Auto-sync for development (DON'T use in production)
  synchronize: process.env.NODE_ENV === 'development',

  // Logging (educational - see all SQL queries)
  logging: ['query', 'error', 'schema', 'migration'],
  logger: 'advanced-console',

  // Entities
  entities: [User, Artist, Album, Track],

  // Migrations
  migrations: ['dist/database/migrations/*.js'],
  subscribers: [],
});

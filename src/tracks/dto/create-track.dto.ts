import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((t) => t.artistId !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null; // refers to Artist

  @ValidateIf((t) => t.albumId !== null)
  @IsString()
  @IsNotEmpty()
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}

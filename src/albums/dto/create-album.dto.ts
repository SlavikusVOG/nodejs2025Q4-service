import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((album) => album.artistId !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null; // refers to Artist
}

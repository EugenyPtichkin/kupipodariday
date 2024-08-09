import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  IsNumber,
} from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @IsUrl()
  image: string;

  @IsString()
  @Length(0, 1500)
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  itemsId: number[];

  @IsNumber()
  @IsOptional()
  ownerId: number;
}

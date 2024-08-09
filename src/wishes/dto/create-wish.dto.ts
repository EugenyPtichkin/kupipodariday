import {
  IsUrl,
  Length,
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @IsUrl()
  link: string;

  @IsString()
  @IsUrl()
  image: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  raised: number;

  @IsString()
  @Length(1, 1024)
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  copied: number;

  @IsNumber()
  @IsOptional()
  ownerId: number;

  @IsArray()
  @IsOptional()
  offersId: number[];

  @IsArray()
  @IsOptional()
  wishlistId: number[];
}

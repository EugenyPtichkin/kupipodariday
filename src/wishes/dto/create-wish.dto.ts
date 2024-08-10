import {
  IsUrl,
  Length,
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsArray,
  IsInt,
  IsDate,
} from 'class-validator';
import { Offer } from './../../offers/entities/offer.entity';
import { WishList } from './../../wishlists/entities/wishlist.entity';

export class CreateWishDto {
  @IsInt()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

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
  offers: Offer[];

  @IsArray()
  @IsOptional()
  wishlist: WishList[];
}

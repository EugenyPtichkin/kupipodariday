import {
  IsString,
  Length,
  IsUrl,
  IsEmail,
  IsOptional,
  IsArray,
  IsInt,
  IsDate,
} from 'class-validator';
import { Wish } from './../../wishes/entities/wish.entity';
import { Offer } from './../../offers/entities/offer.entity';
import { WishList } from './../../wishlists/entities/wishlist.entity';

export class CreateUserDto {
  @IsInt()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  @Length(2, 30)
  username: string;

  @IsString()
  @IsOptional()
  @Length(2, 200)
  about: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  @IsOptional()
  wishes: Wish[];

  @IsArray()
  @IsOptional()
  offers: Offer[];

  @IsArray()
  @IsOptional()
  wishlists: WishList[];
}

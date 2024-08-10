import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  IsInt,
  IsDate,
} from 'class-validator';
import { Wish } from './../../wishes/entities/wish.entity';
import { User } from './../../users/entities/user.entity';

export class CreateWishlistDto {
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
  image: string;

  @IsString()
  @Length(0, 1500)
  @IsOptional()
  description: string;

  @IsArray()
  items: Wish[];

  owner: User;
}

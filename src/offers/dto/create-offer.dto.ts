import {
  IsBoolean,
  IsNumber,
  IsInt,
  IsDate,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Wish } from './../../wishes/entities/wish.entity';
import { User } from './../../users/entities/user.entity';

export class CreateOfferDto {
  @IsInt()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsNumber()
  amount: number;

  @IsBoolean()
  hidden: boolean;

  @IsArray()
  @IsOptional()
  items: Wish[];

  owner: User;
}

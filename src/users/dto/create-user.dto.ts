import {
  IsString,
  Length,
  IsUrl,
  IsEmail,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
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
  wishesId: number[];

  @IsArray()
  @IsOptional()
  offersId: number[];

  @IsArray()
  @IsOptional()
  wishlistsId: number[];
}

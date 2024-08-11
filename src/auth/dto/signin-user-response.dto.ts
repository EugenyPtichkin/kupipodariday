import { IsNotEmpty, IsString } from 'class-validator';

export class SigninUserResponseDto {
  @IsNotEmpty()
  @IsString()
  access_token: string;
}

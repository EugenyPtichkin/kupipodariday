import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  amount: number;

  @IsBoolean()
  hidden: boolean;

  @IsNumber()
  @IsOptional()
  itemId: number;

  @IsNumber()
  @IsOptional()
  userId: number;
}

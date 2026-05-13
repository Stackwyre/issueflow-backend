import { IsString, IsNumber, IsOptional, IsDateString, Min } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  creatorId: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: Date;
}
import { PartialType } from '@nestjs/mapped-types';
import { CreateBountyDto } from './create-bounty.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBountyDto extends PartialType(CreateBountyDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  reward?: number;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  tags?: string[];

  @IsOptional()
  deadline?: string;
}

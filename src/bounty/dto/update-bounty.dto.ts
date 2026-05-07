import { PartialType } from '@nestjs/mapped-types';
import { CreateBountyDto } from './create-bounty.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBountyDto extends PartialType(CreateBountyDto) {
  @IsOptional()
  @IsString()
  completionProof?: string;
}
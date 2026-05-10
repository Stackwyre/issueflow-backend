import { PartialType } from '@nestjs/mapped-types';
import { CreateBountyDto } from './create-bounty.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateBountyDto extends PartialType(
  OmitType(CreateBountyDto, ['createdBy'] as const),
) {}
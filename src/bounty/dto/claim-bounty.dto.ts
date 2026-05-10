import { IsString } from 'class-validator';

export class ClaimBountyDto {
  @IsString()
  userId: string;
}
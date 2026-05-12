import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { ClaimBountyDto } from './dto/claim-bounty.dto';
import { Bounty, BountyStatus } from './bounty.entity';

@Injectable()
export class BountyService {
  private bounties: Map<string, Bounty> = new Map();
  private counter = 1;

  create(createBountyDto: CreateBountyDto): Bounty {
    const bounty: Bounty = {
      id: this.counter.toString(),
      title: createBountyDto.title,
      description: createBountyDto.description,
      amount: createBountyDto.amount,
      status: BountyStatus.OPEN,
      creatorId: createBountyDto.creatorId,
      claimantId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.bounties.set(bounty.id, bounty);
    this.counter++;
    return bounty;
  }

  findAll(): Bounty[] {
    return Array.from(this.bounties.values());
  }

  findOne(id: string): Bounty {
    const bounty = this.bounties.get(id);
    if (!bounty) {
      throw new NotFoundException(`Bounty with ID ${id} not found`);
    }
    return bounty;
  }

  update(id: string, updateBountyDto: UpdateBountyDto): Bounty {
    const bounty = this.findOne(id);
    
    if (bounty.status !== BountyStatus.OPEN) {
      throw new BadRequestException('Cannot update bounty that is not open');
    }

    Object.assign(bounty, updateBountyDto);
    bounty.updatedAt = new Date();
    
    return bounty;
  }

  claim(id: string, claimBountyDto: ClaimBountyDto): Bounty {
    const bounty = this.findOne(id);
    
    if (bounty.status !== BountyStatus.OPEN) {
      throw new BadRequestException('Bounty is not available for claiming');
    }

    bounty.status = BountyStatus.IN_PROGRESS;
    bounty.claimantId = claimBountyDto.claimantId;
    bounty.updatedAt = new Date();
    
    return bounty;
  }

  cancel(id: string): Bounty {
    const bounty = this.findOne(id);
    
    if (bounty.status === BountyStatus.COMPLETED || bounty.status === BountyStatus.CANCELLED) {
      throw new BadRequestException('Cannot cancel completed or already cancelled bounty');
    }

    bounty.status = BountyStatus.CANCELLED;
    bounty.updatedAt = new Date();
    
    return bounty;
  }

  complete(id: string): Bounty {
    const bounty = this.findOne(id);
    
    if (bounty.status !== BountyStatus.IN_PROGRESS) {
      throw new BadRequestException('Can only complete bounties that are in progress');
    }

    bounty.status = BountyStatus.COMPLETED;
    bounty.updatedAt = new Date();
    
    return bounty;
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { BountyService } from './bounty.service';
import { NotFoundException } from '@nestjs/common';
import { BountyStatus } from './bounty.entity';

describe('BountyService', () => {
  let service: BountyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BountyService],
    }).compile();

    service = module.get<BountyService>(BountyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a bounty', () => {
      const createBountyDto = {
        title: 'Test Bounty',
        description: 'Test Description',
        amount: 100,
        createdBy: 'user123',
      };

      const result = service.create(createBountyDto);

      expect(result).toBeDefined();
      expect(result.title).toBe(createBountyDto.title);
      expect(result.status).toBe(BountyStatus.OPEN);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException for non-existent bounty', () => {
      expect(() => service.findOne('non-existent')).toThrow(
        NotFoundException,
      );
    });
  });
});

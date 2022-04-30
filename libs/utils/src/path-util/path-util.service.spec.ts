import { Test, TestingModule } from '@nestjs/testing';
import { PathUtilService } from './path-util.service';

describe('PathUtilService', () => {
  let service: PathUtilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathUtilService],
    }).compile();

    service = module.get<PathUtilService>(PathUtilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

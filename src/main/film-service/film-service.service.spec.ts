import { Test, TestingModule } from '@nestjs/testing';
import { FilmServiceService } from './film-service.service';

describe('FilmServiceService', () => {
  let service: FilmServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmServiceService],
    }).compile();

    service = module.get<FilmServiceService>(FilmServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

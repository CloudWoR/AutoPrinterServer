import { Test, TestingModule } from '@nestjs/testing';
import { FilmServiceController } from './film-service.controller';

describe('FilmServiceController', () => {
  let controller: FilmServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmServiceController],
    }).compile();

    controller = module.get<FilmServiceController>(FilmServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

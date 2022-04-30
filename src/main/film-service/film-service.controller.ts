import { Controller, Get } from '@nestjs/common';
import { FilmServiceService } from './film-service.service';

@Controller('film-service')
export class FilmServiceController {
  constructor(private readonly service: FilmServiceService) {}

  @Get()
  public utilTest() {
    return this.service.test()
  }
}

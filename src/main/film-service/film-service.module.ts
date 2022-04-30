import { UtilsModule } from '@libs/utils';
import { Module } from '@nestjs/common';
import { FilmServiceService } from './film-service.service';
import { FilmServiceController } from './film-service.controller';

@Module({
  imports: [UtilsModule],
  providers: [FilmServiceService],
  controllers: [FilmServiceController]
})
export class FilmServiceModule {}

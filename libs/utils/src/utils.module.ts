import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { PathUtilModule } from './path-util/path-util.module';
import { PathUtilService } from './path-util/path-util.service';

@Module({
  imports: [PathUtilModule],
  providers: [UtilsService, PathUtilService],
  exports: [UtilsService, PathUtilService],
})
export class UtilsModule {}

import { Module } from '@nestjs/common';
import { PathUtilService } from './path-util.service';

@Module({
  providers: [PathUtilService],
  exports: [PathUtilService],
})
export class PathUtilModule {}

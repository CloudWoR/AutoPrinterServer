import { database } from '@main/configure/configure.load';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'rxjs';
import { DatabaseService } from './database.service';
import { T_REPORT } from './entity/local-entity/report.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database],
      isGlobal: true, 
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}

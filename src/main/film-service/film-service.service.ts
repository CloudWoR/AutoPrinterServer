import { DatabaseService } from '@libs/database';
import { PathUtilService } from '@libs/utils/path-util/path-util.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class FilmServiceService {
  constructor(
    private readonly pathUtil: PathUtilService,
    private readonly config: ConfigService,
    private readonly database: DatabaseService,
  ) {
    this.test();
  }
  public async test() {
    // const basedir = this.pathUtil.resolvePath('assets' + '/database');
    // const localdb = this.database.getDataSource('localdb');
    const test = await this.database.testConnect('localdb');
    console.log('test: ', test);
  }
}

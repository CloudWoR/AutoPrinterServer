import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import fs from 'fs';
import { PathUtilService } from '@libs/utils/path-util/path-util.service';
import { IDatabase } from './configure.type';
import { DataSourceOptions } from 'typeorm';
const CONFIG_DATABASE = 'configure/database.yaml';
// const CONFIG_REPORT = 'report.yaml';

const pathUtil = new PathUtilService();
const assetsDir = pathUtil.assetsDir();

export interface ICONFIG_FILES {
  CONFIG_DATABASE: string;
}

export const CONFIG_FILES: ICONFIG_FILES = {
  CONFIG_DATABASE: join(assetsDir, 'configure/database.yaml'),
}


export function database() {
  return yaml.load(
    readFileSync(join(assetsDir, CONFIG_DATABASE), 'utf-8'),
  ) as Record<string, any>;
}

export function dumpDatabase(
  databaseName: keyof IDatabase,
  object: DataSourceOptions,
) {
  const readFile = yaml.load(
    readFileSync(CONFIG_FILES.CONFIG_DATABASE, 'utf-8'),
  ) as Record<string, any>;
  readFile[databaseName] = object;
  const fileDir = CONFIG_FILES.CONFIG_DATABASE;
  const dumpString = yaml.dump(readFile);
  fs.writeFileSync(fileDir, dumpString);
}

// export function report() {
//   return yaml.load(
//     readFileSync(join(assetsDir, CONFIG_REPORT), 'utf-8'),
//   ) as Record<string, any>;
// }

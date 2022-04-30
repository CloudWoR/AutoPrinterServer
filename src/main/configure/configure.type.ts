import { DataSourceOptions } from "typeorm";

export interface IDatabase {
  localdb: DataSourceOptions;
  scp_filmdb: DataSourceOptions;
  remotedb: DataSourceOptions;
}

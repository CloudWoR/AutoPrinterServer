import { dumpDatabase } from '@main/configure/configure.load';
import { IDatabase } from '@main/configure/configure.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseService {
  private LocaldbDataSource: DataSource;
  private FilmdbDataSource: DataSource;
  private RemotedbDataSource: DataSource;
  constructor(private readonly config: ConfigService) {}
  public initailize(sourceName: keyof IDatabase ,option?: DataSourceOptions) {
    const dataSourceOption = option ? { ...option } : { ...this.config.get<DataSourceOptions>(sourceName) };
    switch(sourceName) {
      case 'localdb':
        // dataSourceOption.name = 'LOCAL_DB';
        dataSourceOption.entities = [__dirname + '/entity/local-entity/*.entity.ts'];
        this.LocaldbDataSource = new DataSource(dataSourceOption);
        break;
      case 'scp_filmdb':
        dataSourceOption.entities = [__dirname + '/entity/film-entity/*.entity.ts'];
        this.FilmdbDataSource = new DataSource(dataSourceOption);
        break;
      case 'remotedb':
        // dataSourceOption.entities = [__dirname + '/entity/remote']
        this.RemotedbDataSource = new DataSource(dataSourceOption);
        break;
      default:
        break;
      }
    if (dataSourceOption) {
      this.replaceDatabase(sourceName ,dataSourceOption);
    }
  }

  // 更新数据库配置
  private replaceDatabase(sourceName: keyof IDatabase, option: DataSourceOptions) {
    dumpDatabase(sourceName, option);
  }

  public getDataSource(sourceName: keyof IDatabase) {
    if (!this.LocaldbDataSource) {
      this.initailize(sourceName);
    }
    let dataSource: DataSource;
    switch(sourceName) {
      case 'localdb':
        dataSource = this.LocaldbDataSource;
        break;
      case 'scp_filmdb':
        dataSource = this.FilmdbDataSource;
        break;
      case 'remotedb':
        dataSource = this.RemotedbDataSource;
        break;
    }
    return dataSource;
  }

  public async testConnect(sourceName: keyof IDatabase) {
    const dataSource = this.getDataSource(sourceName);
    try {
      await dataSource.initialize();
      return {
        status: true,
        msg: '系统数据库连接成功',
      };
    } catch (error) {
      return {
        status: false,
        msg: `系统数据库连接失败：${error}`,
      };
    }
  }
}

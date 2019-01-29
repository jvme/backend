import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './videodb.datasource.json';

export class VideodbDataSource extends juggler.DataSource {
  static dataSourceName = 'videodb';

  constructor(
    @inject('datasources.config.videodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {VideoConcurso} from '../models';
import {VideodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VideoConcursoRepository extends DefaultCrudRepository<
  VideoConcurso,
  typeof VideoConcurso.prototype.id
> {
  constructor(
    @inject('datasources.videodb') dataSource: VideodbDataSource,
  ) {
    super(VideoConcurso, dataSource);
  }
}

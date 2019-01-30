import { inject } from '@loopback/context';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  RestBindings,
  Request,
  Response,
} from '@loopback/rest';
import * as multer from 'multer';
import { VideoConcurso } from '../models';
import { VideoConcursoRepository } from '../repositories';

export class VideoConcursoController {
  constructor(
    @repository(VideoConcursoRepository)
    public videoConcursoRepository: VideoConcursoRepository,
  ) { }

  @post('/video-concursos', {
    responses: {
      '200': {
        description: 'VideoConcurso model instance',
        content: { 'application/json': { schema: { 'x-ts-type': VideoConcurso } } },
      },
    },
  })
  async create(@requestBody() videoConcurso: VideoConcurso): Promise<VideoConcurso> {
    return await this.videoConcursoRepository.create(videoConcurso);
  }


  async upload(
    @requestBody({
      description: 'multipart/form-data value.',
      required: true,
      content: {
        'multipart/form-data': {
          // Skip body parsing
          'x-parser': 'stream',
          schema: { type: 'object' },
        },
      },
    })
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    return new Promise<object>((resolve, reject) => {
      upload.any()(request, response, err => {
        if (err) reject(err);
        else {
          resolve({
            files: request.files,
            // tslint:disable-next-line:no-any
            fields: (request as any).fields,
          });
        }
      });
    });
  }


  @get('/video-concursos/count', {
    responses: {
      '200': {
        description: 'VideoConcurso model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(VideoConcurso)) where?: Where,
  ): Promise<Count> {
    return await this.videoConcursoRepository.count(where);
  }

  @get('/video-concursos', {
    responses: {
      '200': {
        description: 'Array of VideoConcurso model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': VideoConcurso } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(VideoConcurso)) filter?: Filter,
  ): Promise<VideoConcurso[]> {
    return await this.videoConcursoRepository.find(filter);
  }

  @patch('/video-concursos', {
    responses: {
      '200': {
        description: 'VideoConcurso PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() videoConcurso: VideoConcurso,
    @param.query.object('where', getWhereSchemaFor(VideoConcurso)) where?: Where,
  ): Promise<Count> {
    return await this.videoConcursoRepository.updateAll(videoConcurso, where);
  }

  @get('/video-concursos/{id}', {
    responses: {
      '200': {
        description: 'VideoConcurso model instance',
        content: { 'application/json': { schema: { 'x-ts-type': VideoConcurso } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<VideoConcurso> {
    return await this.videoConcursoRepository.findById(id);
  }

  @patch('/video-concursos/{id}', {
    responses: {
      '204': {
        description: 'VideoConcurso PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() videoConcurso: VideoConcurso,
  ): Promise<void> {
    await this.videoConcursoRepository.updateById(id, videoConcurso);
  }

  @put('/video-concursos/{id}', {
    responses: {
      '204': {
        description: 'VideoConcurso PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() videoConcurso: VideoConcurso,
  ): Promise<void> {
    await this.videoConcursoRepository.replaceById(id, videoConcurso);
  }

  @del('/video-concursos/{id}', {
    responses: {
      '204': {
        description: 'VideoConcurso DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.videoConcursoRepository.deleteById(id);
  }
}

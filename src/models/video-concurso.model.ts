import {Entity, model, property} from '@loopback/repository';

@model()
export class VideoConcurso extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  videoPresentacion: string;

  @property({
    type: 'string',
    required: true,
  })
  videoResumen: string;

  @property({
    type: 'string',
    required: true,
  })
  video: string;

  constructor(data?: Partial<VideoConcurso>) {
    super(data);
  }
}

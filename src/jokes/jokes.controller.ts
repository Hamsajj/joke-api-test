import { IJokeService } from './jokes.service';
import express from 'express';
import { GetJokeParamsDto, ListJokeResponseParamsDto } from './jokes.dto';
import { HttpStatusCode } from 'axios';
import { plainToInstance } from 'class-transformer';
import { dtoValidationMiddleware } from './middlewares';
import { IController } from '../interfaces';

const defaultCount = 10;

export class JokesController implements IController {
  constructor(private service: IJokeService) {}

  async getJokes(req: express.Request, res: express.Response): Promise<void> {
    const params = req.query as GetJokeParamsDto;
    const jokes = await this.service.getJokes(
      params?.amount || defaultCount,
      params.type || 'any',
    );
    const analyzes = await this.service.analyzeJokes(jokes);
    const listJokeDto = plainToInstance(
      ListJokeResponseParamsDto,
      { jokes, analyzes },
      // to make sure we are not exposing undesired fields
      { excludeExtraneousValues: true },
    );
    res.status(HttpStatusCode.Ok).json(listJokeDto);
  }

  setRouter(app: express.Application) {
    const router = express
      .Router()
      .get(
        '/list',
        dtoValidationMiddleware(GetJokeParamsDto, 'query'),
        this.getJokes.bind(this),
      );
    app.use('/jokes', router);
  }
}

import { Joke } from './jokes.model';
import axios, { HttpStatusCode } from 'axios';
import { GetJokeParamsDto } from './jokes.dto';
import { fetchJokes, JokeApiParam } from '../utils';
import express from 'express';
import { plainToClass, plainToInstance } from 'class-transformer';
import { dtoValidationMiddleware } from './middlewares';

const defaultCount = 10;

export async function getJokesHandler(
  req: express.Request,
  res: express.Response,
) {
  const params = req.query as GetJokeParamsDto;
  const apiParams: JokeApiParam = {
    amount: params?.amount || defaultCount,
  };
  if (params.type && params.type != 'any') {
    apiParams.type = params.type;
  }
  const jokes = await fetchJokes(apiParams);
  res.status(HttpStatusCode.Ok).json(jokes);
}

export function router(): express.Router {
  return express
    .Router()
    .get(
      '/list',
      dtoValidationMiddleware(GetJokeParamsDto, 'query'),
      getJokesHandler,
    );
}

import { JokeService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { IController } from '../interfaces';

export function JokeFactory(): IController {
  const jokeService = new JokeService();
  return new JokesController(jokeService);
}

import { Joke } from './jokes.model';
import { fetchJokes, JokeApiParam } from '../utils';

export interface IJokeService {
  getJokes(amount: number, type: 'single' | 'twopart' | 'any'): Promise<Joke[]>;
}

export class JokeService implements IJokeService {
  async getJokes(
    amount: number,
    type: 'single' | 'twopart' | 'any',
  ): Promise<Joke[]> {
    const apiParams: JokeApiParam = {
      amount: amount,
      type: type && type != 'any' ? type : undefined,
    };

    return fetchJokes(apiParams);
  }
}

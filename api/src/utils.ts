import { Joke } from './jokes/jokes.model';
import axios from 'axios';

const JOKE_API_BASE_URI =
  'https://v2.jokeapi.dev/joke/Programming,Pun?safe-mode';
const DEFAULT_PAGINATION = 10;
export interface JokeApiParam {
  amount: number;
  type?: 'single' | 'twopart';
}
export async function fetchJokes(params?: JokeApiParam): Promise<Joke[]> {
  const amount = params?.amount || DEFAULT_PAGINATION;
  const type = params?.type || 'any';

  const response = await axios.get<{ jokes: Joke[] }>(JOKE_API_BASE_URI, {
    params: { amount, type },
  });
  return response.data.jokes;
}

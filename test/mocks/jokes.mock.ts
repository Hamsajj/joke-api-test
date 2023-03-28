import { Joke } from '../../src/jokes/jokes.model';

export const singleJokeMock = {
  id: 1,
  joke: 'a joke',
  lang: 'en',
  category: 'Pun',
  type: 'single',
};

export const twoPartJokeMock = {
  id: 2,
  setup: 'setup',
  delivery: 'deliver',
  lang: 'en',
  category: 'Pun',
  type: 'twopart',
};

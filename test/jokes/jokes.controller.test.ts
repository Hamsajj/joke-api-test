import { JokesController } from '../../src/jokes/jokes.controller';
import { IJokeService } from '../../src/jokes/jokes.service';
import { Joke } from '../../src/jokes/jokes.model';
import { singleJokeMock } from '../mocks/jokes.mock';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('jokes controller', () => {
  let jokeController: JokesController;
  let mock: IJokeService;
  beforeEach(() => {
    // this demonstrates the value of DI
    // you can create a mock and inject it instead of the actual implementation
    mock = {
      getJokes: jest.fn((): Promise<Joke[]> => {
        const joke = Object.assign(new Joke(), singleJokeMock);
        return Promise.resolve([joke]);
      }),
    };
    jokeController = new JokesController(mock);
  });
  describe('getJokes handler', () => {
    it('should call jokeService.getJokes', async () => {
      await jokeController.getJokes(getMockReq(), getMockRes().res);
      mock = mock as jest.Mocked<IJokeService>;
      expect(mock.getJokes).toBeCalledTimes(1);
    });
  });
});

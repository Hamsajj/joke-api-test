import axios, { HttpStatusCode } from 'axios';
import { singleJokeMock, twoPartJokeMock } from './mocks/jokes.mock';
import { fetchJokes, JokeApiParam } from '../src/utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
afterEach(() => {
  jest.clearAllMocks();
});
describe('fetchJokes', () => {
  describe('successful', () => {
    mockedAxios.get.mockResolvedValue({
      data: { error: false, jokes: [singleJokeMock, twoPartJokeMock] },
      httpStatus: HttpStatusCode.Ok,
    });

    const testCases: {
      name: string;
      input?: JokeApiParam;
      expectedCallArguments: { type: string; amount: number };
    }[] = [
      {
        name: 'should call with default params',
        input: undefined,
        expectedCallArguments: { type: 'any', amount: 10 },
      },
      {
        name: 'should call with input params',
        expectedCallArguments: { type: 'single', amount: 2 },
        input: { type: 'single', amount: 2 },
      },
    ];
    testCases.forEach((tt) => {
      it(tt.name, async () => {
        await expect(fetchJokes(tt.input)).resolves.toMatchObject([
          singleJokeMock,
          twoPartJokeMock,
        ]);
        await expect(mockedAxios.get.mock.calls[0]).toMatchObject([
          'https://v2.jokeapi.dev/joke/Programming,Pun?safe-mode',
          { params: tt.expectedCallArguments },
        ]);
      });
    });
  });
  describe('error', () => {
    it('should throw same error', async () => {
      const e = new Error('Async error');
      mockedAxios.get.mockRejectedValue(new Error('Async error'));
      await expect(fetchJokes()).rejects.toMatchObject(e);
    });
  });
});

import { initApp } from '../src/app';
import request from 'supertest';
import { HttpStatusCode } from 'axios';
import { JokeFactory } from '../src/jokes';
import { AnalyzeResult, Joke } from '../src/jokes/jokes.model';
import supertest from 'supertest';

const app = initApp([JokeFactory()]);
describe('Integration test', () => {
  describe('jokes', () => {
    const baseURL = '/jokes';
    describe('GET /list', () => {
      describe('successful', () => {
        it('get jokes with default parameters', async () => {
          const result = await request(app).get(`${baseURL}/list`);
          expectListReturnsArrayOfJokes(result, 10);
          result.body.jokes.forEach(expectJokeProperties);
          result.body.analyzes.forEach(expectAnalyzeProperties);
        });
        it('get jokes with type single and amount 8', async () => {
          const amount = 8;
          const result = await request(app).get(
            `${baseURL}/list?amount=${amount}&type=single`,
          );
          expectListReturnsArrayOfJokes(result, amount);
          result.body.jokes.forEach((joke: Joke) => {
            expect(joke.type).toEqual('single');
            expectJokeProperties(joke);
          });
        });
      });
      describe('errors', () => {
        const testCases: {
          name: string;
          amount: number;
          type: string;
          expectedCode: number;
          expectedErrors: string[];
        }[] = [
          {
            name: 'amount can not be less than 5',
            amount: 4,
            type: 'single',
            expectedCode: 400,
            expectedErrors: ['amount must not be less than 5'],
          },
          {
            name: 'amount can not be greater than 10',
            amount: 11,
            type: 'single',
            expectedCode: 400,
            expectedErrors: ['amount must not be greater than 10'],
          },
          {
            name: 'type should be either single, twopart or any',
            amount: 10,
            type: 'invalid',
            expectedCode: 400,
            expectedErrors: [
              'type must be one of the following values: single, twopart, any',
            ],
          },
        ];

        testCases.forEach((tt) => {
          it(tt.name, async () => {
            const result = await request(app).get(
              `${baseURL}/list?amount=${tt.amount}&type=${tt.type}`,
            );
            expect(result.statusCode).toEqual(tt.expectedCode);
            expect(result.body).toEqual({
              errors: tt.expectedErrors,
            });
          });
        });
      });
    });
  });
});

function expectListReturnsArrayOfJokes(
  result: supertest.Response,
  length: number,
) {
  expect(result.statusCode).toEqual(HttpStatusCode.Ok);
  expect(result.body.jokes).toBeTruthy();
  expect(Array.isArray(result.body.jokes)).toBe(true);
  expect(result.body.jokes).toHaveLength(length);
}

function expectJokeProperties(joke: Joke) {
  expect(joke).toEqual(
    expect.objectContaining({
      category: expect.any(String),
      type: expect.any(String),
    }),
  );
  if (joke.type === 'single') {
    expect(joke).toEqual(
      expect.objectContaining({
        joke: expect.any(String),
      }),
    );
  } else if (joke.type === 'twopart') {
    expect.objectContaining({
      setup: expect.any(String),
      delivery: expect.any(String),
    });
  }
}

function expectAnalyzeProperties(analyze: AnalyzeResult) {
  expect(analyze).toEqual(
    expect.objectContaining({
      description: expect.any(String),
      value: expect.any(String),
    }),
  );
}

import { initApp } from '../src/app';
import request from 'supertest';
import { HttpStatusCode } from 'axios';

const app = initApp();
describe('Integration test', () => {
  describe('jokes', () => {
    const baseURL = '/jokes';
    describe('GET /list', () => {
      describe('successful', () => {
        it('get jokes with default parameters', async () => {
          const result = await request(app).get(`${baseURL}/list`);
          expect(result.statusCode).toEqual(HttpStatusCode.Ok);
          expect(result.body).toHaveLength(10);
          for (const bodyElement of result.body) {
            expect(bodyElement).toEqual(
              expect.objectContaining({
                category: expect.any(String),
                type: expect.any(String),
              }),
            );
            if (bodyElement.type === 'single') {
              expect(bodyElement).toEqual(
                expect.objectContaining({
                  joke: expect.any(String),
                }),
              );
            } else if (bodyElement.type === 'twopart') {
              expect.objectContaining({
                setup: expect.any(String),
                delivery: expect.any(String),
              });
            }
          }
        });
        it('get jokes with type single and amount 8', async () => {
          const amount = 8;
          const result = await request(app).get(
            `${baseURL}/list?amount=${amount}&type=single`,
          );
          expect(result.statusCode).toEqual(HttpStatusCode.Ok);
          expect(result.body).toHaveLength(amount);
          for (const bodyElement of result.body) {
            expect(bodyElement).toEqual(
              expect.objectContaining({
                category: expect.any(String),
                type: 'single',
                joke: expect.any(String),
              }),
            );
          }
        });
      });
      describe('errors', () => {
        it('amount can not be less than 5', async () => {
          const amount = 4;
          const result = await request(app).get(
            `${baseURL}/list?amount=${amount}&type=single`,
          );
          expect(result.statusCode).toEqual(HttpStatusCode.BadRequest);
          expect(result.body).toEqual({
            errors: ['amount must not be less than 5'],
          });
        });
        it('amount can not be greater than 10', async () => {
          const amount = 11;
          const result = await request(app).get(
            `${baseURL}/list?amount=${amount}&type=single`,
          );
          expect(result.statusCode).toEqual(HttpStatusCode.BadRequest);
          expect(result.body).toEqual({
            errors: ['amount must not be greater than 10'],
          });
        });
        it('type should be either single, twopart or any', async () => {
          const result = await request(app).get(`${baseURL}/list?type=random`);
          expect(result.statusCode).toEqual(HttpStatusCode.BadRequest);
          expect(result.body).toEqual({
            errors: [
              'type must be one of the following values: single, twopart, any',
            ],
          });
        });
      });
    });
  });
});

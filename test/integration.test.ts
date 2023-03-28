import { initApp } from '../src/app';
import request from 'supertest';

const app = initApp();
describe('Integration test', () => {
  it('GET /', async () => {
    const result = await request(app).get('/');
    expect(result.statusCode).toEqual(200);
  });
});

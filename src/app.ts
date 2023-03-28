import express from 'express';
import morgan from 'morgan';
import { router as jokesRouter } from './jokes/jokes.service';

export function initApp(): express.Application {
  const app = express();
  app.use(morgan('tiny'));
  app.use('/jokes', jokesRouter());
  return app;
}

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  const app = initApp();
  app.listen(port, () => {
    console.log(`application is listening on port ${port}.`);
  });
}

import express from 'express';
import morgan from 'morgan';
import { IController } from './interfaces';
import { JokeFactory } from './jokes';

/**
 * This function is just for demonstration
 * getting a list of controllers, creates an express app and registers them all
 * @param controllers
 */
export function initApp(controllers: IController[]): express.Application {
  const app = express();
  app.use(morgan('tiny'));
  for (const controller of controllers) {
    controller.setRouter(app);
  }
  return app;
}

/**
 * This function is just for demonstration
 * in future if we want to remove or add any controller
 * or add any more complexities, we only need to change this function
 */
function getControllers(): IController[] {
  return [JokeFactory()];
}

function startApp() {
  const port = process.env.PORT || 3000;
  const app = initApp(getControllers());
  app.listen(port, () => {
    console.log(`application is listening on port ${port}.`);
  });
}

if (process.env.NODE_ENV != 'test') {
  startApp();
}

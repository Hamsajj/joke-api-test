import express from 'express';
import morgan from 'morgan';

function start() {
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(morgan('tiny'));

  app.get('/', function (req, res) {
    res.send('hello, world!');
  });

  app.listen(port, () => {
    console.log(`application is listening on port ${port}.`);
  });
}

start();

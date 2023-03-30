import { NextFunction, Request, RequestHandler, Response } from 'express';

// noinspection JSUnusedLocalSymbols
export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (process.env.NODE_ENV != 'test') {
    console.error(err.stack);
  }

  res.status(500).json({ error: 'internal server error' });
}

export function errWrapper(fn: RequestHandler) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}

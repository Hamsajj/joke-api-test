import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { sanitize } from 'class-sanitizer';

export function dtoValidationMiddleware(
  type: any,
  requestField: 'body' | 'query',
  skipMissingProperties = false,
): RequestHandler {
  return (req, res, next) => {
    const dtoObj = plainToInstance(type, req[requestField]);
    validate(dtoObj, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors = errors.map((error: ValidationError) =>
            Object.values(error.constraints as object),
          );
          res.status(400).json({ errors: dtoErrors.flat() });
        } else {
          //sanitize the object and call the next middleware
          sanitize(dtoObj);
          req[requestField] = dtoObj;
          next();
        }
      },
    );
  };
}

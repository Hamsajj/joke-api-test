import express from 'express';

export interface IController {
  setRouter(app: express.Application): void;
}

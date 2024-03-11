import express from 'express';

import {
  errorHandler,
  notFound,
  setupMiddlewares,
} from './middlewares/index.js';
import { authRouter, petsRouter, usersRouter } from './routes/index.js';

console.clear();
// Initializations
const app = express();

// Middlewares
setupMiddlewares(app);

// Router
app.use('/auth', authRouter);
app.use('/pets', petsRouter);
app.use('/users', usersRouter);

app.use(notFound);
app.use(errorHandler);

export default app;

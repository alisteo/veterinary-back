

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// import { FRONTEND_URL } from '../config';

// const allowedDomains = [FRONTEND_URL];
// const corsOptions = {
//   origin: function (origin, callbak) {
//     if (allowedDomains.includes(origin)) return callbak(null, true);
//     else return callbak(new Error(`${origin} has been blocked by CORS`));
//   },
// };

export const setupMiddlewares = app => {
  app.use(cors());
  // app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static('./src/public'));
  // app.use(express.static(path.join(__dirname, './../public')));

  app.use(compression()).use(helmet());
  app.use(morgan('dev'));

  // Other middlewares
  app.use(cookieParser());
};

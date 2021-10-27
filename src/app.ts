import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import api from './api';
import { notFound, errorHandler } from './middlewares';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(helmet());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use('/api/', api);

app.use(notFound);
app.use(errorHandler);

export default app;

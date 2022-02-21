import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

import api from './api';
import { notFound, errorHandler } from './middleware/middlewares';

const app = express();

app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT || 'http://localhost:3000'],
  })
);

const rateLimiter = rateLimit({
  windowMs: 10 * 1000, // ten seconds
  max: 50, // limit each IP address to 50 requests / 10 seconds
  message: {
    message: 'Too many requests, please try again later.',
    status: 429,
  },
});

app.use(rateLimiter);

app.use(helmet());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use('/api/', api);

app.use(notFound);
app.use(errorHandler);

export default app;

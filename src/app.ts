require('dotenv').config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const api = require('./api');
const { notFound, errorHandler } = require('./middlewares');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use('/api', api);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

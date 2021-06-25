require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

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

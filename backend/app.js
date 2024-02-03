import dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { errors } from 'celebrate';
import router from './routes/index';
import handleCenterError from './middlewares/centerError';
import NotFoundError from './errors/NotFoundError';
import { requestLogger, errorLogger } from './middlewares/logger';

dotenv.config();
const { PORT = 3000 } = process.env;
console.log(process.env);
const app = express();
app.use(cors());

app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);

app.use(errors());

app.use(handleCenterError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

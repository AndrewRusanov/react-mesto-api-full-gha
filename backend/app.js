require ('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import { errors } from "celebrate";
import router from "./routes/index.js";
import handleCenterError from "./middlewares/centerError.js";
import NotFoundError from "./errors/NotFoundError.js";
import { requestLogger, errorLogger } from "./middlewares/logger.js";

const { PORT = 3000 } = process.env;
console.log(process.env.);
const app = express();
app.use(cors());

app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use("*", (req, res, next) =>
  next(new NotFoundError("Страница не найдена"))
);

app.use(handleCenterError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

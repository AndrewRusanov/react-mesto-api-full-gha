// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
import userRouter from './users';
import cardsRouter from './cards';
import urlRegex from '../utils/constants';
import { createUsers, login } from '../controllers/users';
import auth from '../middlewares/auth';

const router = Router();

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlRegex),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUsers,
);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

export default router;

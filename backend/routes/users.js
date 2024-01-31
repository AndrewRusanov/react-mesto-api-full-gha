// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
import {
  editUserAvatar,
  editUserInfo,
  getUsers,
  getUsersById,
  getUsersInfo,
} from '../controllers/users.js';
import urlRegex from '../utils/constants.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getUsersInfo);
userRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24).required(),
    }),
  }),
  getUsersById,
);
userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  editUserInfo,
);

userRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(urlRegex),
    }),
  }),
  editUserAvatar,
);

export default userRouter;

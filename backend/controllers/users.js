import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import BadRequest from '../errors/BadRequest.js';
import NotFoundError from '../errors/NotFoundError.js';
import ConflictError from '../errors/ConflictError.js';

const { NODE_ENV, JWT_SECRET } = process.env;

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const getUsersById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Запрашиваемый пользователь по _id не найден'));
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Данные введены некорректно'));
      } else { next(err); }
    });
};

export const createUsers = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hashPassword) => User.create({
      name,
      about,
      avatar,
      email,
      password: hashPassword,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError(`Пользователь с email: ${email} уже существует`),
        );
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(err.message));
      } else {
        next(err);
      }
    });
};

export const editUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => (!user
      ? next(new NotFoundError('Запрашиваемый пользователь не найден'))
      : res.status(200).send(user)))
    .catch((error) => (error.name === 'ValidationError'
      ? next(BadRequest('Данные введены некорректно'))
      : next(error)));
};

export const editUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: 'true', runValidators: true },
  )
    .then((user) => (!user
      ? next(new NotFoundError('Запрашиваемый пользователь не найден'))
      : res.status(200).send(user)))
    .catch((error) => (error.name === 'ValidationError'
      ? next(BadRequest('Данные введены некорректно'))
      : next(error)));
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};

export const getUsersInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

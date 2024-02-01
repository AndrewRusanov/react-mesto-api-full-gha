import jwt from 'jsonwebtoken';
import AuthorizationError from '../errors/AuthorizationError.js';

const {SECRET_KEY} = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Ошибка авторизации'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return next(new AuthorizationError('Ошибка авторизации'));
  }
  req.user = payload;
  return next();
};

export default auth;

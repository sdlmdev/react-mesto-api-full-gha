const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  // const token = req.cookies.jwt;
  const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

  // if (!token) {
  //   next(new UnauthorizedError('Необходима авторизация'));
  // }
  try {
    payload = jwt.verify(token, secret);
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  next();
};

const { NODE_ENV, SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorizationError');

module.exports = (req, res, next) => {
  console.log(req.cookie);
  const { authorization } = req.headers;

  if (!authorization) {
    next(new AuthorizationError('Необходима авторизация, что-то не так'));
  } else {
    const token = authorization.replace('Bearer ', '');

    let payload;

    try {
      payload = jwt.verify(
        token,
        NODE_ENV === 'production' ? SECRET_KEY : 'dev-key'
      );
    } catch (err) {
      next(new AuthorizationError('Необходима авторизация, ошибка 401'));
      return;
    }
    req.user = payload;
    next();
  }
};

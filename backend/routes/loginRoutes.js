const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const userRouter = require('./usersRouter');
const cardRouter = require('./cardsRouter');
const auth = require('../middlewares/auth');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const { URL_REGEX } = require('../utils/constants');
const NotFoundError = require('../errors/notFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(URL_REGEX),
    }),
  }),
  createUser
);
router.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('/', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;

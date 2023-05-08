require('dotenv').config();

const { MONGODB_URI, PORT, NODE_ENV } = process.env;
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {
  login,
  createUser,
  // logout,
} = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const handleError = require('./middlewares/handleError');
const auth = require('./middlewares/auth');
const { validationLogin, validationCreateUser } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();

const startServer = async () => {
  try {
    await mongoose.connect(NODE_ENV === 'production' ? MONGODB_URI : 'mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
    });
    console.log('Подключено к MongoDB');
    await app.listen(NODE_ENV === 'production' ? PORT : 3000);
    console.log(`Сервер запущен на порте: ${NODE_ENV === 'production' ? PORT : 3000}`);
  } catch (err) {
    console.log('Ошибка подключения к MongoDB', err);
  }
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
// app.post('/signout', logout);

app.use(auth);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый адрес не найден.')
});

app.use(errorLogger);
app.use(errors());
app.use(handleError);

startServer();

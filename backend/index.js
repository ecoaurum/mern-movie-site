import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import {
  UserController,
  PostController,
  CommentController,
  ActorController,
} from './controllers/index.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations/validations.js';

const app = express();

mongoose
  .connect(
    'mongodb+srv://ecoaurum:Kd73PkjwqPSeZQaTA@archakov3.qw22thy.mongodb.net/blog-mern?retryWrites=true&w=majority&appName=Archakov3'
  )
  .then(() => console.log('DB is OK'))
  .catch((err) => console.log('DB error', err));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

//Авторизация пользователя
app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);
//Регистрация пользователя
app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
);
//Информация о себе
app.get('/auth/me', checkAuth, UserController.getMe);

//Загрузка файлов
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// Получить все тэги
app.get('/tags', PostController.getLastTags);
// Получить посты по тэгам
app.get('/tags/:tag', PostController.getPostsByTag);

// Получить все жанры
app.get('/genres', PostController.getGenres);
// //Получить посты по жанрам
app.get('/genres/:genre', PostController.getPostByGenre);

// Создание нового актера
app.post('/actors', ActorController.createActor);
// Получение одного актера по ID
app.get('/actors/:id', ActorController.getActorById);
// Получение одного актера
app.get('/actors/name/:name', ActorController.getActorByName);
// Получение всех актеров
app.get('/actors', ActorController.getAllActors);
// Обновление информации об актере
app.patch('/actors/:id', ActorController.updateActor);
// Удаление актера
app.delete('/actors/:id', ActorController.removeActor);

// Похожие статьи
app.get('/posts/:id/related', PostController.getRelatedPosts);

// Популярные статьи
app.get('/posts/popular', PostController.getPopularPosts);

// Поиск по сайту
app.get('/search', PostController.searchPosts);

// Сохранение рейтинга пользователя
app.post('/posts/:id/rate', PostController.ratePost);

//Создание постов
app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.removePost);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

//Комментарии
app.post('/comments', CommentController.createComment);
app.get('/comments/:postId', CommentController.getComment);

//Start server
const start = async () => {
  try {
    app.listen(4444, (err) => {
      err
        ? console.log(err)
        : console.log(`Server running on http://localhost:4444`);
    });
  } catch (err) {
    console.error('Error starting the server: ', err);
  }
};
start();

import { body } from 'express-validator';

//Валидация при входе
export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({
    min: 5,
    max: 32,
  }),
];

//Валидация при регистрации
export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({
    min: 5,
    max: 32,
  }),
  body('fullName', 'Укажите имя').isLength({ min: 3, max: 255 }),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

//Валидация при создании статьи
export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
  body('tags', 'Неверный формат тэгов').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];

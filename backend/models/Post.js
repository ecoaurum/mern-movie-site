import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true, // Добавляем индекс к полю title
    },
    text: {
      type: String,
      required: true,
      unique: true,
      index: true, // Добавляем индекс к полю text
    },
    tags: {
      type: Array,
      default: [],
    },
    genres: {
      type: Array,
      default: [],
    },
    filmName: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: String,
      required: true,
      trim: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    filmGenre: {
      type: [String],
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
      trim: true,
    },
    cast: {
      type: [String],
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userRatings: {
      type: [Number], // Массив чисел для хранения оценок пользователей
      default: [],
    },
    ratedUsers: {
      type: [String], // Массив для хранения ID пользователей или ключей для незарегистрированных пользователей
      default: [],
    },
    imageUrl: {
      type: String, // Поле для URL изображения
      default: '', // Установите значение по умолчанию, если необходимо
    },
  },
  {
    timestamps: true,
  }
);

// Создание индексов для ускорения поиска
PostSchema.index({ title: 'text' });
PostSchema.index({ text: 'text' });

export default mongoose.model('Post', PostSchema);

import PostModel from '../models/Post.js';

// Получение жанров
export const getGenres = async (req, res) => {
  try {
    const posts = await PostModel.find().exec();
    const genres = posts
      .map((post) => post.genres)
      .flat()
      .filter((genre, index, self) => self.indexOf(genre) === index); // Убираем дублирование жанров
    res.json(genres);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить жанры',
    });
  }
};

// Получить посты по жанрам
export const getPostByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const posts = await PostModel.find({ genres: genre })
      .populate('user')
      .exec();
    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

//Получение последних тэгов
export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().exec();
    const tags = [...new Set(posts.flatMap((obj) => obj.tags))];

    return res.json(tags);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить актеров',
    });
  }
};

//Получение посты по тэгам
export const getPostsByTag = async (req, res) => {
  try {
    const tag = req.params.tag;
    const posts = await PostModel.find({ tags: tag }).populate('user').exec();
    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

//Получение похожих статей
export const getRelatedPosts = async (req, res) => {
  try {
    const postId = req.params.id;
    const currentPost = await PostModel.findById(postId).exec();

    if (!currentPost) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    // Ищем похожие статьи по жанрам и тегам, исключая текущую статью
    const relatedPost = await PostModel.find({
      _id: { $ne: postId }, // Исключаем текущую статью
      $or: [
        { genres: { $in: currentPost.genres } },
        { tags: { $in: currentPost.tags } },
      ],
    })
      .limit(5) // Ограничиваем результат пятью статьями
      .populate('user')
      .exec();

    return res.status(200).json(relatedPost); // Возвращаем список похожих статей
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить похожие статьи',
    });
  }
};

// Получение популярных постов
export const getPopularPosts = async (req, res) => {
  try {
    // Находим все посты в базе данных, сортируем по количеству просмотров (viewsCount) в порядке убывания и ограничиваем выборку 7 постами
    const posts = await PostModel.find()
      .sort({ viewsCount: -1 })
      .limit(7)
      .exec();
    // Возвращаем найденные посты в формате JSON
    res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить популярные статьи',
    });
  }
};

//Сохранение рейтинга оценки фильма пользователем
export const ratePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { rating, userId } = req.body; // Принимаем рейтинг и userId

    // Проверка допустимости оценки
    if (!rating || rating < 1 || rating > 10) {
      return res.status(400).json({
        message: 'Оценка должна быть в диапазоне от 1 до 10',
      });
    }

    // Поиск поста по ID
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: 'Пост не найден',
      });
    }

    // Проверка, выставил ли пользователь уже рейтинг
    if (post.ratedUsers.includes(userId)) {
      return res.status(400).json({
        message: 'Вы уже выставили рейтинг этому фильму',
      });
    }

    // Добавление оценки пользователя
    post.userRatings.push(rating);
    post.ratedUsers.push(userId); // Добавление ID пользователя или ключа

    await post.save();

    res.json({ success: true, post });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось сохранить оценку',
    });
  }
};

//Получение всех статей
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

//Получение одной статьи
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findByIdAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )
      .populate('user')
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }
        return res.status(200).json(doc);
      })

      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: 'Не удалось вернуть статью',
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

//Создание статьи
export const create = async (req, res) => {
  try {
    const genres = Array.isArray(req.body.genres)
      ? req.body.genres
      : req.body.genres.split(',');

    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      filmName: req.body.filmName,
      tagline: req.body.tagline,
      rating: req.body.rating,
      releaseDate: req.body.releaseDate,
      country: req.body.country,
      filmGenre: req.body.filmGenre,
      duration: req.body.duration,
      director: req.body.director,
      cast: req.body.cast,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(','),
      genres: genres,
      user: req.userId,
    });

    const post = await doc.save();
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

//Удаление статьи
export const removePost = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findByIdAndDelete({ _id: postId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }
        res.status(200).json({
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: 'Не удалось удалить статью',
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

//Обновление статьи
export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const genres = Array.isArray(req.body.genres)
      ? req.body.genres
      : req.body.genres.split(',');

    await PostModel.findByIdAndUpdate(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        filmName: req.body.filmName,
        tagline: req.body.tagline,
        rating: req.body.rating,
        releaseDate: req.body.releaseDate,
        country: req.body.country,
        filmGenre: req.body.filmGenre,
        duration: req.body.duration,
        director: req.body.director,
        cast: req.body.cast,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(','),
        genres: genres,
        user: req.userId,
      }
    );

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось обновить статью',
    });
  }
};

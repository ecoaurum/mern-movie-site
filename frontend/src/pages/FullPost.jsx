import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Rating from 'react-rating-stars-component';
import ReactMarkdown from 'react-markdown';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { TagsBlock } from '../components/TagsBlock'; // Импорт компонента TagsBlock
import { GenresBlock } from '../components/GenresBlock';
import { PopularPostsBlock } from '../components/PopularPostsBlock'; // Импортируем компонент с популярными постами

import axios from '../axios';
import styles from './FullPost.module.scss';

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [tags, setTags] = useState([]); // Состояние для хранения тегов
  const [genres, setGenres] = useState([]); // Состояние для хранения жанров
  const [relatedPosts, setRelatedPosts] = useState([]); // Состояние для похожих записей
  const [userRating, setUserRating] = useState(0); // Состояние для хранения рейтинга пользователя
  const [isRated, setIsRated] = useState(false); // Состояние для проверки, выставлен ли рейтинг
  const [isGenresLoading, setIsGenresLoading] = useState(true); // Состояние для отслеживания загрузки жанров
  const [isTagsLoading, setIsTagsLoading] = useState(true); // Состояние для отслеживания загрузки тегов
  const [popularPosts, setPopularPosts] = useState([]); // Состояние для популярных постов
  const [isPopularLoading, setIsPopularLoading] = useState(true); // Состояние загрузки популярных постов

  const { id } = useParams();
  const userData = useSelector((state) => state.auth.data); // Получаем данные пользователя из состояния

  useEffect(() => {
    window.scrollTo(0, 0); // Прокручиваем страницу наверх при загрузке страницы
    fetchPost();
    fetchTags(); // Вызов функции fetchTags для получения тегов
    fetchGenres(); // Вызов функции fetchGenres для получения жанров
    fetchRelatedPosts(); // Получение похожих записей
    fetchPopularPosts(); // Получение популярных записей

    // Получение рейтинга и информации о выставлении рейтинга из LocalStorage
    const storedRating = localStorage.getItem(`post-${id}-rating`);
    const ratedKey = userData ? userData._id : `guest-${id}`;
    const isAlreadyRated = localStorage.getItem(ratedKey);

    if (storedRating) {
      setUserRating(parseInt(storedRating, 10));
    }

    if (isAlreadyRated) {
      setIsRated(true);
    }
  }, [id, userData]);

  // Получение одной статьи
  const fetchPost = async () => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  };

  // Добавлена функция fetchTags для получения тегов из сервера
  const fetchTags = async () => {
    try {
      const { data } = await axios.get('/tags');
      setTags(data);
      setIsTagsLoading(false);
    } catch (err) {
      console.error(err);
      setIsTagsLoading(false);
    }
  };

  // Добавлена функция fetchGenres для получения жанров из сервера
  const fetchGenres = async () => {
    try {
      const { data } = await axios.get('/genres');
      setGenres(data);
      setIsGenresLoading(false);
    } catch (err) {
      console.error(err);
      setIsGenresLoading(false);
    }
  };

  // Получение похожих записей
  const fetchRelatedPosts = async () => {
    try {
      const { data } = await axios.get(`/posts/${id}/related`); // Используем новый эндпоинт
      setRelatedPosts(data.slice(0, 5)); // Ограничиваем до 5 записей
    } catch (err) {
      console.error(err);
    }
  };

  // Оценка фильма - рейтинг из 10 звезд
  const handleRatingChange = async (newRating) => {
    if (isRated) {
      alert('Вы уже выставили рейтинг этому фильму');
      return;
    }

    setUserRating(newRating);
    const ratedKey = userData ? userData._id : `guest-${id}`;

    // Сохранение информации о выставленном рейтинге в LocalStorage
    localStorage.setItem(`post-${id}-rating`, newRating);
    localStorage.setItem(ratedKey, true);

    try {
      // Отправка рейтинга на сервер
      await axios.post(
        `/posts/${id}/rate`,
        { rating: newRating, userId: ratedKey },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setIsRated(true);
      alert('Спасибо за вашу оценку!');
    } catch (err) {
      console.error(err);
      alert('Ошибка при сохранении оценки!');
    }
  };

  // Функция для получения популярных постов
  const fetchPopularPosts = async () => {
    try {
      const { data } = await axios.get('/posts/popular');
      setPopularPosts(data);
      setIsPopularLoading(false);
    } catch (err) {
      console.error(err);
      setIsPopularLoading(false);
    }
  };

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <div className={styles.container} style={{ display: 'flex', gap: '20px' }}>
      {/* Контейнер для основного контента */}
      <div style={{ flex: '0 0 70%' }}>
        <Post
          id={data.id}
          title={data.title}
          viewsCount={data.viewsCount}
          commentsCount={data.commentsCount}
          tags={data.tags}
          genre={data.genre}
          isFullPost
        >
          {/* Блок для данных о фильме */}
          <div
            className={styles.filmDetails}
            style={{ display: 'flex', marginBottom: '20px' }}
          >
            {/* Блок с фото и названием фильма */}
            <div style={{ flex: '0 0 300px', marginRight: '20px' }}>
              <img
                src={
                  data.imageUrl
                    ? `http://localhost:4444${data.imageUrl}`
                    : 'Фото отсутствует'
                }
                alt={data.title}
                className={styles.actorImage}
              />
            </div>

            {/* Блок с правым блоком от фото */}
            <div>
              <p>
                <strong>Название:</strong> {data.filmName}
              </p>
              <p>
                <strong>Дата выпуска:</strong> {data.releaseDate}
              </p>
              <p>
                <strong>Слоган:</strong> {data.tagline}
              </p>
              <p>
                <strong>Рейтинг:</strong> {data.rating}
              </p>
              <p>
                <strong>Страна:</strong> {data.country}
              </p>
              <p>
                <strong>Жанр:</strong> {data.filmGenre}
              </p>
              <p>
                <strong>Продолжительность:</strong> {data.duration}
              </p>
              <p>
                <strong>Режиссер:</strong> {data.director}
              </p>
              <p>
                <strong>В главных ролях:</strong> {data.cast}
              </p>
            </div>
          </div>
          {/* Блок для описания фильма */}
          <div style={{ marginBottom: '20px' }}>
            <div dangerouslySetInnerHTML={{ __html: data.text }} />
          </div>
          {/* Вставка блока для оценки фильма */}
          <div style={{ marginBottom: '20px' }}>
            <h3>Оцените фильм</h3>
            <Rating
              count={10}
              size={30}
              activeColor="#ffd700"
              value={userRating}
              onChange={handleRatingChange}
              edit={!isRated} // Делаем рейтинг неактивным, если пользователь уже выставил оценку
            />
          </div>
        </Post>
        {/* Похожие записи */}
        <div className={styles.relatedPosts}>
          <h3>Похожие фильмы</h3>
          <div className={styles.relatedPostsContainer}>
            {relatedPosts.map((post) => (
              <Link
                key={post._id}
                to={`/posts/${post._id}`}
                className={styles.relatedPost}
              >
                <img
                  src={
                    post.imageUrl
                      ? `http://localhost:4444${post.imageUrl}`
                      : 'Фото отсутствует'
                  }
                  alt={post.title}
                  className={styles.relatedPostImage}
                />
                <p className={styles.relatedPostTitle}>{post.title}</p>
              </Link>
            ))}
          </div>
        </div>
        <Index postId={id} />
      </div>

      {/* Контейнер для блока с тегами и жанрами*/}
      <div style={{ flex: '0 0 30%' }}>
        <TagsBlock items={tags} isLoading={isTagsLoading} />
        <GenresBlock items={genres} isLoading={isGenresLoading} />
        {/* Отображение популярных постов под блоком жанры */}
        <PopularPostsBlock items={popularPosts} isLoading={isPopularLoading} />
      </div>
    </div>
  );
};

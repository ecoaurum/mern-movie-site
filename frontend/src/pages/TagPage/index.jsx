import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../../components/Post';
import {
  fetchPostsByTag,
  fetchTags,
  fetchActorInfoByName,
  fetchGenres,
} from '../../redux/slices/posts';
import { TagsBlock } from '../../components/TagsBlock';
import { GenresBlock } from '../../components/GenresBlock';
import { PopularPostsBlock } from '../../components/PopularPostsBlock'; // Импортируем компонент с популярными постами
import styles from './TagPage.module.scss';
import axios from '../../axios';

// Компонент отображает посты, фильтрованные по тегу
export const TagPage = () => {
  const { tag } = useParams(); // Получаем тег из параметров URL
  const dispatch = useDispatch();
  const [popularPosts, setPopularPosts] = useState([]); // Состояние для популярных постов
  const [isPopularLoading, setIsPopularLoading] = useState(true); // Состояние загрузки популярных постов
  const { posts, tags, genres, actor } = useSelector((state) => state.posts);

  // Получаем посты по тегу и информацию об актере при загрузке компонента
  useEffect(() => {
    window.scrollTo(0, 0); // Прокручиваем страницу наверх при загрузке страницы
    dispatch(fetchPostsByTag(tag));
    dispatch(fetchTags());
    dispatch(fetchGenres());
    dispatch(fetchActorInfoByName(tag));
    // dispatch(fetchPopularPosts());
    fetchPopularPosts();
  }, [dispatch, tag]);

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

  const isPostsLoading = posts.status === 'loading';
  const isActorLoading = actor.status === 'loading';

  const getFullImageUrl = (url) => {
    if (!url) return ''; // Проверяем, что url не undefined или null
    if (url.startsWith('http') || url.startsWith('https')) {
      return url;
    }
    return `http://localhost:4444${url}`;
  };

  // Отрывок текста в отображении постов под биографией
  const getExcerpt = (text, length = 200) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return (
    <Grid container spacing={4}>
      {/* Изменяем для адаптивности */}
      <Grid item xs={12} md={8}>
        {/* Отображение всей информации об актере */}
        {isActorLoading ? (
          <div>Loading actor information...</div>
        ) : actor.info ? (
          <div className={styles.actorInfoContainer}>
            {/* отображение имени актера */}
            <h2 className={styles.actorName}>{actor.info.name}</h2>
            {/* отображение фотографии актера */}
            {actor.info.photo && (
              <img
                src={getFullImageUrl(actor.info.photo)}
                alt={actor.info.name}
                className={styles.actorImage}
              />
            )}
            <div className={styles.actorDetails}>
              <p>
                <strong>Дата рождения:</strong> {actor.info.dateOfBirth}
              </p>
              <p>
                <strong>Место рождения:</strong> {actor.info.placeOfBirth}
              </p>
              <p>
                <strong>Рост:</strong> {actor.info.height}
              </p>
              <p>
                <strong>Карьера:</strong> {actor.info.career}
              </p>
              <p>
                <strong>Жанры:</strong> {actor.info.genres}
              </p>
              <p>
                <strong>Стили:</strong> {actor.info.styles}
              </p>
            </div>
            {/* отображение биографии актера с применением dangerouslySetInnerHTML */}
            <div className={styles.actorDetails}>
              <div
                dangerouslySetInnerHTML={{ __html: actor.info.biography }} // Безопасное рендеринг HTML
              />
            </div>
          </div>
        ) : null}

        {/* Отображение списка постов, связанных с актером */}
        {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              key={obj._id}
              id={obj._id}
              title={obj.title}
              imageUrl={
                obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''
              }
              rating={obj.rating}
              releaseDate={obj.releaseDate}
              country={obj.country}
              filmGenre={obj.filmGenre}
              duration={obj.duration}
              director={obj.director}
              cast={obj.cast}
              excerpt={getExcerpt(obj.text)}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.commentsCount}
              tags={obj.tags}
              isEditable={false}
            />
          )
        )}
      </Grid>
      {/* Изменяем для адаптивности */}
      <Grid item xs={12} md={4}>
        {/* Отображение блока тегов/актеров */}
        <TagsBlock items={tags.items} isLoading={tags.status === 'loading'} />

        {/* Отображение блока жанров */}
        <GenresBlock
          items={genres.items}
          isLoading={genres.status === 'loading'}
        />
        {/* Отображение популярных постов под блоком жанры */}
        <PopularPostsBlock items={popularPosts} isLoading={isPopularLoading} />
      </Grid>
    </Grid>
  );
};

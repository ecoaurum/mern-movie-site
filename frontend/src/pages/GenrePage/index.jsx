import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../../components/Post';
import { fetchPostsByGenre, fetchGenres } from '../../redux/slices/posts';
import { GenresBlock } from '../../components/GenresBlock';
import { TagsBlock } from '../../components/TagsBlock';
import { PopularPostsBlock } from '../../components/PopularPostsBlock'; // Импортируем компонент с популярными постами
import axios from '../../axios';

// Компонент отображает посты, фильтрованные по жанру
export const GenrePage = () => {
  const { genre } = useParams(); // Получаем тег из параметров URL
  const dispatch = useDispatch();
  const [popularPosts, setPopularPosts] = useState([]); // Состояние для популярных постов
  const [isPopularLoading, setIsPopularLoading] = useState(true); // Состояние загрузки популярных постов
  const { posts, genres, tags } = useSelector((state) => state.posts);

  // Получаем посты по тегу при загрузке компонента
  useEffect(() => {
    window.scrollTo(0, 0); // Прокручиваем страницу наверх при загрузке страницы
    dispatch(fetchPostsByGenre(genre));
    dispatch(fetchGenres());
    fetchPopularPosts();
  }, [dispatch, genre]);

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

  // Отрывок текста в отображении постов в разделе жанры
  const getExcerpt = (text, length = 200) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  return (
    <Grid container spacing={4}>
      {/* Изменяем для адаптивности */}
      <Grid item xs={12} md={8}>
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
        {/* Отображение блока тегов */}
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

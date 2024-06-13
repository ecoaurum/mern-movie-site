import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { GenresBlock } from '../components/GenresBlock';
import { PopularPostsBlock } from '../components/PopularPostsBlock'; // Импортируем компонент с популярными постами
import { FilmCarousel } from '../components/FilmCarousel'; // Импортируем компонент карусели
import { fetchPosts, fetchTags, fetchGenres } from '../redux/slices/posts';
// import from '../App.css';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, genres } = useSelector((state) => state.posts);

  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Состояние для текущей страницы
  const postsPerPage = 10; // Количество постов на странице

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const isGenresLoading = genres.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchGenres());
  }, [dispatch]);

  // Пагинация
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setCurrentPage(1); // Сбрасываем текущую страницу при изменении вкладки
    window.scrollTo(0, 0); // Прокручиваем страницу наверх
  };

  // Сортировка постов по дате загрузки и по популярности
  const sortedPosts = useMemo(() => {
    if (currentTab === 0) {
      return [...posts.items].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (currentTab === 1) {
      return [...posts.items].sort((a, b) => b.viewsCount - a.viewsCount);
    }
  }, [currentTab, posts.items]);

  // Функция для получения популярных постов
  const popularPosts = useMemo(() => {
    return [...posts.items]
      .sort((a, b) => b.viewsCount - a.viewsCount)
      .slice(0, 10);
  }, [posts.items]);

  // Отрывок текста в отображении постов на главной
  const getExcerpt = (text, length = 200) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0); // Прокручиваем страницу наверх при смене страницы
  };

  // Получение постов для текущей страницы
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return sortedPosts.slice(startIndex, startIndex + postsPerPage);
  }, [currentPage, sortedPosts]);

  return (
    <>
      {/* Карусель фильмов */}
      <FilmCarousel />
      <Tabs
        style={{ marginBottom: 15 }}
        value={currentTab}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        {/* Изменение размеров сетки в зависимости от ширины экрана */}
        <Grid item xs={12} md={8}>
          {/* <Grid xs={8} item> */}
          {(isPostsLoading ? [...Array(5)] : paginatedPosts).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''
                }
                user={obj.user}
                createdAt={obj.createdAt}
                rating={obj.rating}
                releaseDate={obj.releaseDate}
                country={obj.country}
                filmGenre={obj.filmGenre}
                duration={obj.duration}
                director={obj.director}
                cast={obj.cast}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                excerpt={getExcerpt(obj.text)}
                genres={obj.genres}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
          {/* Элементы управления пагинацией */}
          <Pagination
            count={Math.ceil(sortedPosts.length / postsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        </Grid>
        {/* Изменение размеров сетки в зависимости от ширины экрана */}
        <Grid item xs={12} md={4}>
          {/* <Grid xs={4} item> */}
          {/* Отображение блока тегов */}
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          {/* Отображение блока жанров */}
          <GenresBlock items={genres.items} isLoading={isGenresLoading} />
          {/* Отображение популярных постов под блоком жанры */}
          <PopularPostsBlock items={popularPosts} isLoading={isPostsLoading} />
        </Grid>
      </Grid>
    </>
  );
};

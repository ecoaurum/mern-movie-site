import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './SearchResults.module.scss';

export const SearchResults = () => {
  const results = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);

  useEffect(() => {
    console.log('Search results:', results); // Добавим логирование результатов поиска
  }, [results]);

  if (status === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (status === 'failed') {
    return <div>Ошибка загрузки данных</div>;
  }

  // Функция для удаления отображения HTML-тегов с использованием регулярного выражения
  const stripHtml = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  };

  return (
    <div className={styles.results}>
      {results.map((result) => (
        <div key={result._id} className={styles.resultItem}>
          <h3>
            <Link to={`/posts/${result._id}`} className={styles.link}>
              {result.title}
            </Link>
            <img
              src={
                result.imageUrl
                  ? `http://localhost:4444${result.imageUrl}`
                  : 'Фото отсутствует'
              }
              alt={result.title}
              className={styles.image}
            />
            {/* Используем функцию для удаления HTML-тегов */}
            <p>{stripHtml(result.text)}</p>
          </h3>
        </div>
      ))}
    </div>
  );
};

// export default SearchResults;

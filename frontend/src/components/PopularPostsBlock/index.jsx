import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PopularPostsBlock.module.scss';

// Компонент для отображения популярных постов
export const PopularPostsBlock = ({ items, isLoading }) => {
  return (
    <div className={styles.root}>
      <h2>Популярные фильмы</h2>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        items.map((obj) => (
          <div key={obj._id} className={styles.post}>
            <Link to={`/posts/${obj._id}`}>
              <img
                src={
                  obj.imageUrl
                    ? `http://localhost:4444${obj.imageUrl}`
                    : 'Фото отсутствует'
                }
                alt={obj.title}
                className={styles.image}
              />
              <h3>{obj.title}</h3>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

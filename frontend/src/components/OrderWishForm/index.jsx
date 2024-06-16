import React, { useState } from 'react';
import axios from '../../axios';
import styles from './OrderWishesForm.module.scss';

//компонент для добавления пожеланий
export const OrderWishForm = ({ onAddWish }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/orderwish', { author, content });
      onAddWish(res.data);
      setAuthor('');
      setContent('');
    } catch (err) {
      console.error('Failed to submit wish', err);
    }
  };

  return (
    <div className={styles.form}>
      {/* <h3>Оставить пожелание</h3> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Ваше имя"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Какой фильм хотели бы посмотреть..."
          required
        />
        <button type="submit">Добавить пожелание</button>
      </form>
    </div>
  );
};

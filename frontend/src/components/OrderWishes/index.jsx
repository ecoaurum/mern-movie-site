import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { OrderWishForm } from '../OrderWishForm';
import styles from './OrderWishes.module.scss';

//компонент для отображения списка пожеланий
export const OrderWishes = () => {
  const [wishes, setWishes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const res = await axios.get('/orderwish');
        setWishes(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch wishes', err);
      }
    };

    fetchWishes();
  }, []);

  const handleAddWish = (wish) => {
    setWishes([...wishes, wish]);
  };

  return (
    <div className={styles.wishes}>
      <h2>Стол заказов</h2>
      <OrderWishForm onAddWish={handleAddWish} />
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <ul>
          {wishes.map((wish) => (
            <li key={wish._id}>
              <p>
                <strong>{wish.author}</strong>
              </p>
              <p>{wish.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

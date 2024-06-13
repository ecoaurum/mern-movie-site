import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import axios from '../../axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './FilmCarousel.module.scss';

export const FilmCarousel = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const { data } = await axios.get('/posts');
        setFilms(shuffleArray(data).slice(0, 10));
      } catch (err) {
        console.error('Ошибка при получении фильмов', err);
      }
    };

    fetchFilms();
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Проверяем, является ли ширина экрана мобильной
  const isMobile = window.innerWidth <= 768;
  // Добавляем проверку для планшетов
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

  // Инициализируем переменную для количества отображаемых слайдов
  let slidesToShow = 10;

  // Устанавливаем количество слайдов в зависимости от типа устройства
  if (isMobile) {
    slidesToShow = 3;
  } else if (isTablet) {
    slidesToShow = 7; // Устанавливаем 7 слайдов для планшетов
  }

  // Настройки карусели
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    swipe: true, // Активируем поддержку свайпов
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', right: '10px' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', left: '10px' }}
        onClick={onClick}
      />
    );
  }

  return (
    <div className={styles.carousel}>
      <Slider {...settings}>
        {films.map((film) => (
          <div key={film._id} className={styles.slide}>
            <Link to={`/posts/${film._id}`}>
              <img
                src={
                  film.imageUrl
                    ? `http://localhost:4444${film.imageUrl}`
                    : 'Фото отсутствует'
                }
                alt={film.title}
                className={styles.image}
              />
              <h3 className={styles.title}>{film.title}</h3>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

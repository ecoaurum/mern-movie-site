import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchSearchResults } from '../../redux/slices/search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './SearchBar.module.scss';
// import './SearchBar.css';

// Компонент SearchBar, который будет содержать поле ввода для поиска и кнопку для отправки запроса.
export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (query.trim() !== '') {
      dispatch(fetchSearchResults(query));
      navigate('/search');
    }
  };

  // Добавляем обработчик нажатия клавиши Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Добавляем useEffect для отслеживания изменения адресной строки
  useEffect(() => {
    // Если путь не содержит "/search", очищаем поле поиска
    if (!location.pathname.includes('/search')) {
      setQuery('');
    }
  }, [location.pathname]);

  return (
    <div className={styles.searchBar}>
      <TextField
        label="Поиск фильмов"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        // className={styles.textField}
        sx={{
          height: '40px',
          '& .MuiInputBase-root': {
            height: '30px',
          },
          '& .MuiOutlinedInput-input': {
            padding: '10px 14px',
          },
          '& .MuiInputLabel-root': {
            left: '12px',
            top: '-12px',
          },
        }}
      />
      <Button onClick={handleSearch} className={styles.linkButton}>
        Найти
      </Button>
    </div>
  );
};

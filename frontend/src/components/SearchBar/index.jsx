import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchSearchResults } from '../../redux/slices/search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import styles from './SearchBar.module.scss';
import './SearchBar.css';

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
    <div className="searchBar">
      <TextField
        label="Поиск"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button variant="contained" onClick={handleSearch}>
        Найти
      </Button>
    </div>
  );
};

// export default SearchBar;

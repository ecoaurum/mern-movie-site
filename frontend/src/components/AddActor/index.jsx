import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import axios from '../../axios';
import styless from './AddActor.module.scss';

export const AddActor = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  // const [dateOfDeath, setDateOfDeath] = useState('');
  // const [placeOfDeath, setPlaceOfDeath] = useState('');
  const [height, setHeight] = useState('');
  const [career, setCareer] = useState('');
  const [genres, setGenres] = useState('');
  const [styles, setStyles] = useState('');
  const [biography, setBiography] = useState('');

  // Опции для поля ввода SimpleMDE
  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите биографию актера...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
        sanitizerFunction: null, // Разрешаем HTML
      },
      promptURLs: true,
    }),
    []
  );

  // Добавление актера
  const onSubmit = async () => {
    if (!name || !biography) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }
    try {
      const fields = {
        name,
        photo,
        dateOfBirth,
        placeOfBirth,
        // dateOfDeath,
        // placeOfDeath,
        height,
        career,
        genres,
        styles,
        biography,
      };

      await axios.post('/actors', fields);
      navigate('/actors');
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании актера!');
    }
  };

  return (
    <Paper style={{ padding: 30 }}>
      {/* Поле для ввода имени актера */}
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Имя актера..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      {/* Поле для ввода ссылки на фото актера */}
      <TextField
        variant="standard"
        placeholder="Ссылка на фото актера..."
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        fullWidth
      />
      {/* Поле для ввода даты рождения актера */}
      <TextField
        variant="standard"
        placeholder="Дата рождения..."
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        fullWidth
      />
      {/* Поле для ввода места рождения актера */}
      <TextField
        variant="standard"
        placeholder="Место рождения..."
        value={placeOfBirth}
        onChange={(e) => setPlaceOfBirth(e.target.value)}
        fullWidth
      />
      {/* Поле для ввода роста актера */}
      <TextField
        variant="standard"
        placeholder="Рост..."
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        fullWidth
      />
      {/* Поле для ввода карьеры актера */}
      <TextField
        variant="standard"
        placeholder="Карьера..."
        value={career}
        onChange={(e) => setCareer(e.target.value)}
        fullWidth
      />
      {/* Поле для ввода жанров актера */}
      <TextField
        variant="standard"
        placeholder="Жанры..."
        value={genres}
        onChange={(e) => setGenres(e.target.value)}
        fullWidth
      />
      {/* Поле для ввода стилей актера */}
      <TextField
        variant="standard"
        placeholder="Стили..."
        value={styles}
        onChange={(e) => setStyles(e.target.value)}
        fullWidth
      />
      {/* Редактор биографии актера с использованием SimpleMDE */}
      <SimpleMDE
        className={styless.editor}
        value={biography}
        onChange={setBiography}
        options={options}
      />
      <Button onClick={onSubmit} size="large" variant="contained">
        Создать
      </Button>
    </Paper>
  );
};

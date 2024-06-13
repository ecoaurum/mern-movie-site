import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import SimpleMDE from 'react-simplemde-editor';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styless from './EditActor.module.scss';

import {
  fetchActorInfoById,
  fetchUpdateActor,
  fetchRemoveActor,
} from '../../redux/slices/posts';

export const EditActor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actor } = useSelector((state) => state.posts);

  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [placeOfDeath, setPlaceOfDeath] = useState('');
  const [height, setHeight] = useState('');
  const [career, setCareer] = useState('');
  const [genres, setGenres] = useState('');
  const [styles, setStyles] = useState('');
  const [biography, setBiography] = useState('');

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
    }),
    []
  );

  useEffect(() => {
    dispatch(fetchActorInfoById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (actor.info) {
      setName(actor.info.name);
      setPhoto(actor.info.photo);
      setDateOfBirth(actor.info.dateOfBirth);
      setPlaceOfBirth(actor.info.placeOfBirth);
      setDateOfDeath(actor.info.dateOfDeath);
      setPlaceOfDeath(actor.info.placeOfDeath);
      setHeight(actor.info.height);
      setCareer(actor.info.career);
      setGenres(actor.info.genres);
      setStyles(actor.info.styles);
      setBiography(actor.info.biography);
    }
  }, [actor.info]);

  const onSubmit = async () => {
    try {
      const actorData = {
        name,
        photo,
        dateOfBirth,
        placeOfBirth,
        dateOfDeath,
        placeOfDeath,
        height,
        career,
        genres,
        styles,
        biography,
      };

      console.log('Submitting updated fields:', actorData);
      await dispatch(fetchUpdateActor({ id, actorData }));

      navigate(`/actors`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при обновлении актера!');
    }
  };

  const onDelete = async () => {
    try {
      await dispatch(fetchRemoveActor(id));
      navigate('/actors');
    } catch (err) {
      console.warn(err);
      alert('Ошибка при удалении актера!');
    }
  };

  return (
    <Paper style={{ padding: 30 }}>
      <TextField
        variant="standard"
        placeholder="Имя актера"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <TextField
        variant="standard"
        placeholder="Фото URL"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <TextField
        variant="standard"
        placeholder="Дата рождения"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <TextField
        variant="standard"
        placeholder="Место рождения"
        value={placeOfBirth}
        onChange={(e) => setPlaceOfBirth(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      {/* <TextField
        variant="standard"
        placeholder="Дата смерти"
        value={dateOfDeath}
        onChange={(e) => setDateOfDeath(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <TextField
        variant="standard"
        placeholder="Место смерти"
        value={placeOfDeath}
        onChange={(e) => setPlaceOfDeath(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      /> */}
      <TextField
        variant="standard"
        placeholder="Рост"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <TextField
        variant="standard"
        placeholder="Карьера"
        value={career}
        onChange={(e) => setCareer(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <TextField
        variant="standard"
        placeholder="Жанры"
        value={genres}
        onChange={(e) => setGenres(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <TextField
        variant="standard"
        placeholder="Стили"
        value={styles}
        onChange={(e) => setStyles(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />

      {/* Редактор биографии актера с использованием SimpleMDE */}
      <SimpleMDE
        className={styless.editor}
        placeholder="Биография актера..."
        value={biography}
        onChange={setBiography}
        options={options}
      />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Сохранить изменения
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={onDelete}
        style={{ marginLeft: '20px' }}
      >
        Удалить актера
      </Button>
    </Paper>
  );
};

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { selectIsAuth } from '../../redux/slices/auth';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from '../../axios';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [filmName, setFilmName] = useState('');
  const [tagline, setTagline] = useState('');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [country, setCountry] = useState('');
  const [filmGenre, setFilmGenre] = useState('');
  const [duration, setDuration] = useState('');
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState('');
  const [tags, setTags] = useState('');
  const [genres, setGenres] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const inputFileRef = useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        filmName,
        tagline,
        rating,
        releaseDate,
        country,
        filmGenre,
        duration,
        director,
        cast,
        imageUrl,
        tags,
        genres: genres.split(','),
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании статьи!');
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setFilmName(data.filmName);
          setTagline(data.tagline);
          setRating(data.rating);
          setReleaseDate(data.releaseDate);
          setCountry(data.country);
          setFilmGenre(data.filmGenre);
          setDuration(data.duration);
          setDirector(data.director);
          setCast(data.cast);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(','));
          setGenres(data.genres.join(','));
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении статьи!');
        });
    }
  }, [id]);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
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

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {/* Фото поста */}
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      {/* Заголовок статьи */}
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      {/* Имя актёра */}
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Имя актёра"
        fullWidth
      />
      {/* Жанр (стили) */}
      <TextField
        value={genres}
        onChange={(e) => setGenres(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Стиль актера"
        fullWidth
      />
      {/* Название фильма */}
      <TextField
        value={filmName}
        onChange={(e) => setFilmName(e.target.value)}
        variant="standard"
        placeholder="Название фильма"
        fullWidth
      />
      {/* Слоган */}
      <TextField
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
        variant="standard"
        placeholder="Слоган"
        fullWidth
      />
      {/* Рейтинг */}
      <TextField
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        variant="standard"
        placeholder="Рейтинг"
        fullWidth
      />
      {/* Дата выхода */}
      <TextField
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
        variant="standard"
        placeholder="Дата выхода"
        fullWidth
      />
      {/* Страна */}
      <TextField
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        variant="standard"
        placeholder="Страна"
        fullWidth
      />
      {/* Жанр фильма */}
      <TextField
        value={filmGenre}
        onChange={(e) => setFilmGenre(e.target.value)}
        variant="standard"
        placeholder="Жанр фильма"
        fullWidth
      />
      {/* Продолжительность */}
      <TextField
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        variant="standard"
        placeholder="Продолжительность"
        fullWidth
      />
      {/* Режиссер */}
      <TextField
        value={director}
        onChange={(e) => setDirector(e.target.value)}
        variant="standard"
        placeholder="Режиссер"
        fullWidth
      />
      {/* В ролях */}
      <TextField
        value={cast}
        onChange={(e) => setCast(e.target.value)}
        variant="standard"
        placeholder="В ролях"
        fullWidth
      />
      {/* Редактор текста с использованием SimpleMDE */}
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};

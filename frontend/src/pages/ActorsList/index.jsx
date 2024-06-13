import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActors } from '../../redux/slices/posts'; // Асинхронное действие для получения списка актеров
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export const ActorsList = () => {
  const dispatch = useDispatch();
  const { actors, status } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchActors());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Ошибка при загрузке актеров!</div>;
  }

  return (
    <div>
      {actors.items.map((actor) => (
        <Paper
          key={actor._id}
          style={{ marginBottom: '20px', padding: '20px' }}
        >
          <Typography variant="h5">{actor.name}</Typography>
          <Typography variant="body1">{actor.biography}</Typography>
          <Button
            component={Link}
            to={`/actors/${actor._id}/edit`}
            variant="contained"
            color="primary"
            style={{ marginRight: '10px' }}
          >
            Редактировать
          </Button>
        </Paper>
      ))}
    </div>
  );
};

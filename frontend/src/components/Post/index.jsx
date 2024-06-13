import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Button from '@mui/material/Button';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/posts';

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  filmName,
  tagline,
  rating,
  releaseDate,
  country,
  filmGenre,
  duration,
  director,
  cast,
  viewsCount,
  commentsCount,
  tags,
  excerpt,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl &&
        (isFullPost ? (
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={imageUrl}
            alt={title}
          />
        ) : (
          <Link to={`/posts/${id}`}>
            <img
              className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
              src={imageUrl}
              alt={title}
            />
          </Link>
        ))}
      <div className={styles.wrapper}>
        {/* <UserInfo {...user} additionalText={createdAt} /> */}
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          {/* Условное отображение элементов, если isFullPost равно false */}
          {!isFullPost && (
            <>
              <p>
                <strong>Рейтинг: </strong> {rating}
              </p>
              <p>
                <strong>Дата выхода: </strong>
                {releaseDate}
              </p>
              <p>
                <strong>Страна: </strong>
                {country}
              </p>
              <p>
                <strong>Жанр: </strong>
                {filmGenre}
              </p>
              <p>
                <strong>Продолжительность: </strong>
                {duration}
              </p>
              <p>
                <strong>Режиссер: </strong>
                {director}
              </p>
              <p>
                <strong>В ролях: </strong>
                {cast}
              </p>
              {/* Отображение фрагмента текста на главной странице */}
              {excerpt && (
                <strong>
                  <p className={styles.excerpt}>{excerpt}</p>
                </strong>
              )}
              {/* Добавление кнопки "смотреть онлайн" */}
              <div className={styles.watchButtonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/posts/${id}`}
                  className={styles.watchButton}
                >
                  Смотреть онлайн
                </Button>
              </div>
            </>
          )}

          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

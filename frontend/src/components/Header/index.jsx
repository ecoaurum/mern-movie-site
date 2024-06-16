import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { SearchBar } from '../SearchBar';
import styles from './Header.module.scss';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <img src="/images/logo/logo9.png" alt="Logo" />
          </Link>
          <SearchBar />
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button className={styles.linkButton}>Написать статью</Button>
                </Link>
                <Link to="/add-actor">
                  <Button className={styles.linkButton}>Добавить актера</Button>
                </Link>
                <Link to="/actors">
                  <Button className={styles.linkButton}>Список актеров</Button>
                </Link>
                <Link to="/orderwish">
                  <Button className={styles.linkButton}>Стол заказов</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  color="error"
                  className={styles.linkButton}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button className={styles.linkButton}>Войти</Button>
                </Link>
                <Link to="/register">
                  <Button className={styles.linkButton}>Создать аккаунт</Button>
                </Link>
                <Link to="/orderwish">
                  <Button className={styles.linkButton}>Стол заказов</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

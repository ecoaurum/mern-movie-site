import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';
import { Footer } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import { TagPage } from './pages/TagPage';
import { GenrePage } from './pages/GenrePage';
import { AddActor } from './components/AddActor';
import { EditActor } from './pages/EditActor';
import { ActorsList } from './pages/ActorsList';
import { SearchResults } from './components/SearchResults';
import { NotFound } from './components/NotFound';
import { OrderWishes } from './components/OrderWishes';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:tag" element={<TagPage />} />
          <Route path="/genres/:genre" element={<GenrePage />} />
          <Route path="/add-actor" element={<AddActor />} />
          <Route path="/actors" element={<ActorsList />} />
          <Route path="/actors/:id/edit" element={<EditActor />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/orderwish" element={<OrderWishes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;

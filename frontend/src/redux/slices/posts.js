import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

// Асинхронный action для получения всех постов
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

// Асинхронный action для удаления поста
export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id) => {
    axios.delete(`/posts/${id}`);
  }
);

// Асинхронный action для получения всех тегов
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

// Новый асинхронный action для получения постов по тегу
export const fetchPostsByTag = createAsyncThunk(
  'posts/fetchPostsByTag',
  async (tag) => {
    const { data } = await axios.get(`/tags/${tag}`);
    return data;
  }
);

// Асинхронный action для получения всех жанров
export const fetchGenres = createAsyncThunk('posts/fetchGenres', async () => {
  const { data } = await axios.get('/genres');
  return data;
});

// Асинхронный action для получения постов по жанру
export const fetchPostsByGenre = createAsyncThunk(
  'posts/fetchPostsByGenre',
  async (genre) => {
    const { data } = await axios.get(`/genres/${genre}`);
    return data;
  }
);

// Асинхронный action для получения всех актеров
export const fetchActors = createAsyncThunk('posts/fetchActors', async () => {
  const { data } = await axios.get('/actors');
  return data;
});

// Асинхронный action для получения информации об актере по имени
export const fetchActorInfoByName = createAsyncThunk(
  'posts/fetchActorInfoByName',
  async (actorName) => {
    const { data } = await axios.get(`/actors/name/${actorName}`);
    return data;
  }
);

// Асинхронный action для получения информации об актере по ID
export const fetchActorInfoById = createAsyncThunk(
  'posts/fetchActorInfoById',
  async (actorId) => {
    const { data } = await axios.get(`/actors/${actorId}`);
    return data;
  }
);

// Асинхронный action для обновления актера
export const fetchUpdateActor = createAsyncThunk(
  'posts/fetchUpdateActor',
  async ({ id, actorData }) => {
    const { data } = await axios.patch(`/actors/${id}`, actorData);
    return data;
  }
);

// Асинхронный action для удаления актера
export const fetchRemoveActor = createAsyncThunk(
  'posts/fetchRemoveActor',
  async (id) => {
    await axios.delete(`/actors/${id}`);
  }
);

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  genres: {
    items: [],
    status: 'loading',
  },
  actor: {
    info: null,
    status: 'loading',
  },
  actors: {
    items: [],
    status: 'loading',
  },
};

// Создание slice для управления состоянием постов и тегов
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    //Получение статей
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    //Удаление статьи
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },

    //Получение тэгов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },

    // Получение постов по тегу
    [fetchPostsByTag.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPostsByTag.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    //Получение жанров
    [fetchGenres.pending]: (state) => {
      state.genres.items = [];
      state.genres.status = 'loading';
    },
    [fetchGenres.fulfilled]: (state, action) => {
      state.genres.items = action.payload;
      state.genres.status = 'loaded';
    },
    [fetchGenres.rejected]: (state) => {
      state.genres.items = [];
      state.genres.status = 'error';
    },

    // Получение постов по жанру
    [fetchPostsByGenre.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPostsByGenre.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPostsByGenre.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Получение информации об актере по имени
    [fetchActorInfoByName.pending]: (state) => {
      state.actor.info = null;
      state.actor.status = 'loading';
    },
    [fetchActorInfoByName.fulfilled]: (state, action) => {
      state.actor.info = action.payload;
      state.actor.status = 'loaded';
    },
    [fetchActorInfoByName.rejected]: (state) => {
      state.actor.info = null;
      state.actor.status = 'error';
    },

    // Получение информации об актере по ID
    [fetchActorInfoById.pending]: (state) => {
      state.actor.info = null;
      state.actor.status = 'loading';
    },
    [fetchActorInfoById.fulfilled]: (state, action) => {
      state.actor.info = action.payload;
      state.actor.status = 'loaded';
    },
    [fetchActorInfoById.rejected]: (state) => {
      state.actor.info = null;
      state.actor.status = 'error';
    },

    // Обновление актера
    [fetchUpdateActor.pending]: (state) => {
      state.actor.status = 'loading';
    },
    [fetchUpdateActor.fulfilled]: (state, action) => {
      state.actor.info = action.payload;
      state.actor.status = 'loaded';
    },
    [fetchUpdateActor.rejected]: (state) => {
      state.actor.status = 'error';
    },

    // Удаление актера
    [fetchRemoveActor.pending]: (state) => {
      state.actor.status = 'loading';
    },
    [fetchRemoveActor.fulfilled]: (state, action) => {
      state.actor.info = null;
      state.actor.status = 'loaded';
    },
    [fetchRemoveActor.rejected]: (state) => {
      state.actor.status = 'error';
    },

    // Список всех актеров
    [fetchActors.pending]: (state) => {
      state.actors.items = [];
      state.actors.status = 'loading';
    },
    [fetchActors.fulfilled]: (state, action) => {
      state.actors.items = action.payload;
      state.actors.status = 'loaded';
    },
    [fetchActors.rejected]: (state) => {
      state.actors.items = [];
      state.actors.status = 'error';
    },
  },
});

export const postsReducer = postsSlice.reducer;

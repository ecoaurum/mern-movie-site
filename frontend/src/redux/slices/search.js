// src/redux/slices/search.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query) => {
    const { data } = await axios.get(`/search?query=${query}`);
    return data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const searchReducer = searchSlice.reducer;

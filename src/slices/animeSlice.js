import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';

const initialState = {
  anime: {},
  animeLoadingStatus: 'idle',
  similarAnimeList: [],
  similarAnimeLoadingStatus: 'idle',
};

export const fetchAnime = createAsyncThunk('anime/fetchAnime', (id) => {
  const { getAnimeById } = useKodikService();
  return getAnimeById(id);
});

export const fetchSimilarAnime = createAsyncThunk(
  'anime/fetchSimilarAnime',
  (title) => {
    const { searchAnimeByTitle } = useKodikService();
    return searchAnimeByTitle(title);
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAnime.pending, (state) => {
      state.animeLoadingStatus = 'loading';
    });
    builder.addCase(fetchAnime.fulfilled, (state, action) => {
      state.animeLoadingStatus = 'idle';
      state.anime = action.payload;
    });
    builder.addCase(fetchAnime.rejected, (state) => {
      state.animeLoadingStatus = 'error';
    });
    builder.addCase(fetchSimilarAnime.pending, (state) => {
      state.similarAnimeLoadingStatus = 'loading';
    });
    builder.addCase(fetchSimilarAnime.fulfilled, (state, action) => {
      state.similarAnimeLoadingStatus = 'idle';
      state.similarAnimeList = action.payload;
    });
    builder.addCase(fetchSimilarAnime.rejected, (state) => {
      state.similarAnimeLoadingStatus = 'error';
    });
  },
});

export default animeSlice.reducer;

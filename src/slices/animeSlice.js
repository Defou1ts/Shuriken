import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';

const initialState = {
  anime: {},
  animeLoadingStatus: 'idle',
  linkedAnime: [],
  linkedAnimeLoadingStatusL: 'idle',
};

export const fetchAnime = createAsyncThunk('anime/fetchAnime', (id) => {
  const { getAnimeById } = useKodikService();
  return getAnimeById(id);
});

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
  },
});

export default animeSlice.reducer;

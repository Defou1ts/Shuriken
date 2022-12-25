import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';
import { IDLE, LOADING, ERROR } from '../utils/consts';

const initialState = {
	shikimoriAnime: [],
	shikimoriAnimeLoadingStatus: IDLE,
	createdAtAnime: [],
	createdAtAnimeLoadingStatus: IDLE,
};

export const fetchNewAnimeByOptionsShikimori = createAsyncThunk(
	'newAnime/fetchNewAnimeByOptionsShikimori',
	(options) => {
		const { getNewAnimeByOptions } = useKodikService();
		return getNewAnimeByOptions(options);
	}
);

export const fetchNewAnimeByOptionsCreatedAt = createAsyncThunk(
	'newAnime/fetchNewAnimeByOptionsCreatedAt',
	(options) => {
		const { getNewAnimeByOptions } = useKodikService();
		return getNewAnimeByOptions(options);
	}
);

const newAnimeSlice = createSlice({
	name: 'newAnime',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchNewAnimeByOptionsShikimori.pending, (state) => {
			state.shikimoriAnimeLoadingStatus = LOADING;
		});
		builder.addCase(fetchNewAnimeByOptionsShikimori.fulfilled, (state, action) => {
			state.shikimoriAnime = action.payload;
			state.shikimoriAnimeLoadingStatus = IDLE;
		});
		builder.addCase(fetchNewAnimeByOptionsShikimori.rejected, (state) => {
			state.shikimoriAnimeLoadingStatus = ERROR;
		});

		builder.addCase(fetchNewAnimeByOptionsCreatedAt.pending, (state) => {
			state.createdAtAnimeLoadingStatus = LOADING;
		});
		builder.addCase(fetchNewAnimeByOptionsCreatedAt.fulfilled, (state, action) => {
			state.createdAtAnime = action.payload;
			state.createdAtAnimeLoadingStatus = IDLE;
		});
		builder.addCase(fetchNewAnimeByOptionsCreatedAt.rejected, (state) => {
			state.createdAtAnimeLoadingStatus = ERROR;
		});
		builder.addDefaultCase(() => {});
	},
});

export default newAnimeSlice.reducer;

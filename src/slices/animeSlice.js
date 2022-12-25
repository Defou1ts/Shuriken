import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';
import { IDLE, LOADING, ERROR } from '../utils/consts';

const initialState = {
	currentAnime: {},
	animeLoadingStatus: IDLE,
	similarAnimeList: [],
	similarAnimeLoadingStatus: IDLE,
	selectedTranslation: 610,
	voiceTranslations: [],
	voiceTranslationsLoadingStatus: IDLE,
	reviews: null,
	reviewsLoadingStatus: IDLE,
};

export const fetchTranslations = createAsyncThunk('anime/fetchTranslations', (id) => {
	const { getTranslationsListById } = useKodikService();
	return getTranslationsListById(id);
});

export const fetchAnime = createAsyncThunk('anime/fetchAnime', (options) => {
	const { getCurrentAnimeById } = useKodikService();
	return getCurrentAnimeById(options);
});

export const fetchSimilarAnime = createAsyncThunk('anime/fetchSimilarAnime', (title) => {
	const { searchAnimeByTitle } = useKodikService();
	const mutatedTitle = title.slice(0, title.indexOf(' '));
	return searchAnimeByTitle(mutatedTitle);
});

export const fetchReviews = createAsyncThunk('anime/fetchReviews', (id) => {
	const { findReviewsByAnime } = useKodikService();
	return findReviewsByAnime(id);
});

const animeSlice = createSlice({
	name: 'anime',
	initialState,
	reducers: {
		setSelectedTranslation: (state, action) => {
			state.selectedTranslation = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAnime.pending, (state) => {
			state.animeLoadingStatus = LOADING;
		});
		builder.addCase(fetchAnime.fulfilled, (state, action) => {
			state.animeLoadingStatus = IDLE;
			state.currentAnime = action.payload;
		});
		builder.addCase(fetchAnime.rejected, (state) => {
			state.animeLoadingStatus = ERROR;
		});
		builder.addCase(fetchSimilarAnime.pending, (state) => {
			state.similarAnimeLoadingStatus = LOADING;
		});
		builder.addCase(fetchSimilarAnime.fulfilled, (state, action) => {
			state.similarAnimeLoadingStatus = IDLE;
			state.similarAnimeList = action.payload;
		});
		builder.addCase(fetchSimilarAnime.rejected, (state) => {
			state.similarAnimeLoadingStatus = ERROR;
		});
		builder.addCase(fetchTranslations.pending, (state) => {
			state.voiceTranslationsLoadingStatus = LOADING;
		});
		builder.addCase(fetchTranslations.fulfilled, (state, action) => {
			state.voiceTranslations = IDLE;
			state.voiceTranslations = action.payload;
		});
		builder.addCase(fetchTranslations.rejected, (state) => {
			state.voiceTranslationsLoadingStatus = ERROR;
		});
		builder.addCase(fetchReviews.pending, (state) => {
			state.reviewsLoadingStatus = LOADING;
		});
		builder.addCase(fetchReviews.fulfilled, (state, action) => {
			state.reviewsLoadingStatus = IDLE;
			state.reviews = action.payload;
		});
		builder.addCase(fetchReviews.rejected, (state, action) => {
			console.log(action);
			state.reviewsLoadingStatus = ERROR;
		});
	},
});

export const { setSelectedTranslation } = animeSlice.actions;

export default animeSlice.reducer;

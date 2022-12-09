import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';
import { ERROR, IDLE, LOADING } from '../utils/consts';

const initialState = {
	catalogAnime: [],
	catalogAnimeLoadingStatus: 'idle',
	options: {
		genres: [],
		type: ['tv'],
		voice: '610',
		status: ['ongoing'],
		ageRating: [],
		sort: 'shikimori_rating',
		limit: 10,
	},
};

export const fetchCatalogAnimeByOptions = createAsyncThunk('catalog/fetchCatalogAnimeByOptions', (options) => {
	const { getNewAnimeByOptions } = useKodikService();
	return getNewAnimeByOptions(options);
});

const catalogSlice = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		addGenre: (state, action) => {
			state.options.genres.push(action.payload);
		},
		removeGenre: (state, action) => {
			state.options.genres = state.options.genres.filter((item) => item !== action.payload);
		},
		addType: (state, action) => {
			state.options.type.push(action.payload);
		},
		removeType: (state, action) => {
			state.options.type = state.options.type.filter((item) => item !== action.payload);
		},
		addAgeRating: (state, action) => {
			state.options.ageRating.push(action.payload);
		},
		removeAgeRating: (state, action) => {
			state.options.ageRating = state.options.ageRating.filter((item) => item !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCatalogAnimeByOptions.pending, (state) => {
			state.catalogAnimeLoadingStatus = LOADING;
		});
		builder.addCase(fetchCatalogAnimeByOptions.fulfilled, (state, action) => {
			state.catalogAnime = action.payload;
			state.catalogAnimeLoadingStatus = IDLE;
		});
		builder.addCase(fetchCatalogAnimeByOptions.rejected, (state) => {
			state.catalogAnimeLoadingStatus = ERROR;
		});

		builder.addDefaultCase(() => {});
	},
});

export const { addGenre, removeGenre, addType, removeType, addAgeRating, removeAgeRating } = catalogSlice.actions;

export default catalogSlice.reducer;

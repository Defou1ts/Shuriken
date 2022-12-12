import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';
import { ERROR, IDLE, LOADING } from '../utils/consts';

const initialState = {
	catalogAnime: [],
	catalogAnimeLoadingStatus: 'idle',
	options: {
		genres: '',
		type: ['tv'],
		voice: '610',
		status: [],
		ageRating: [],
		sort: 'shikimori_rating',
		limit: 10,
	},
	ageRatings: ['G', 'PG', 'PG-13', 'NC-17', 'R'],
	types: [
		{
			name: 'ТВ-сериал',
			type: 'tv',
		},
		{
			name: 'OVA',
			type: 'ova',
		},
		{
			name: 'Фильм',
			type: 'movie',
		},
		{
			name: 'Спешл',
			type: 'special',
		},
	],
	sortsTypes: [
		{
			label: 'По дате обновления',
			value: 'updated_at',
		},
		{
			label: 'Год выпуска',
			value: 'year',
		},
		{
			label: 'По дате выпуска',
			value: 'created_at',
		},
		{
			label: 'По рейтингу',
			value: 'shikimori_rating',
		},
	],
};

export const fetchCatalogAnimeByOptions = createAsyncThunk('catalog/fetchCatalogAnimeByOptions', (options) => {
	const { getNewAnimeByOptions } = useKodikService();
	return getNewAnimeByOptions(options);
});

const catalogSlice = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		setGenres: (state, action) => {
			state.options.genres = action.payload;
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
		setSort: (state, action) => {
			console.log(action.payload);
			state.options.sort = action.payload;
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

export const { setGenres, addType, removeType, addAgeRating, removeAgeRating, setSort } = catalogSlice.actions;

export default catalogSlice.reducer;

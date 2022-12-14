import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';
import { ERROR, IDLE, LOADING } from '../utils/consts';

const initialState = {
	catalogAnime: [],
	catalogAnimeLoadingStatus: 'idle',
	isActiveFiltersMenu: false,
	isActiveSortMenu: false,
	search: '',
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

export const fetchSearchAnimeByTitle = createAsyncThunk('anime/fetchSearchAnimeByTitle', (title) => {
	const { searchAnimeByTitle } = useKodikService();
	return searchAnimeByTitle(title);
});

const catalogSlice = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		setIsActiveFiltersMenu: (state, action) => {
			state.isActiveFiltersMenu = action.payload;
		},
		setIsActiveSortMenu: (state, action) => {
			state.isActiveSortMenu = action.payload;
		},
		setSearch: (state, action) => {
			state.search = action.payload;
		},
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
		builder.addCase(fetchSearchAnimeByTitle.pending, (state) => {
			state.catalogAnimeLoadingStatus = LOADING;
		});
		builder.addCase(fetchSearchAnimeByTitle.fulfilled, (state, action) => {
			state.catalogAnimeLoadingStatus = IDLE;
			state.catalogAnime = action.payload;
		});
		builder.addCase(fetchSearchAnimeByTitle.rejected, (state) => {
			state.catalogAnimeLoadingStatus = ERROR;
		});

		builder.addDefaultCase(() => {});
	},
});

export const {
	setGenres,
	addType,
	removeType,
	addAgeRating,
	removeAgeRating,
	setSort,
	setSearch,
	setIsActiveFiltersMenu,
	setIsActiveSortMenu,
} = catalogSlice.actions;

export default catalogSlice.reducer;

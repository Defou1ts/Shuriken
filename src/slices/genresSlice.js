import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';
import { IDLE, LOADING, ERROR } from '../utils/consts';

const initialState = {
	genres: [],
	genresLoadingStatus: IDLE,
};

export const fetchGenres = createAsyncThunk('genres/fetchGenres', () => {
	const { getGenres } = useKodikService();
	return getGenres();
});

const genresSlice = createSlice({
	name: 'genres',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchGenres.pending, (state) => {
			state.genresLoadingStatus = LOADING;
		});
		builder.addCase(fetchGenres.fulfilled, (state, action) => {
			state.genres = action.payload;
			state.genresLoadingStatus = IDLE;
		});
		builder.addCase(fetchGenres.rejected, (state) => {
			state.genresLoadingStatus = ERROR;
		});
		builder.addDefaultCase(() => {});
	},
});

export default genresSlice.reducer;
